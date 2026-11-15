from database import Base, get_db
from fastapi.testclient import TestClient
from main import app
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


def test_create_survey():
    payload = {
        "gardenerName": "Júnior",
        "services": ["Corte de grama", "Limpeza"],
        "date": "2026-11-15",
        "ratings": {
            "punctuality": 5,
            "quality": 5,
            "cleanliness": 4,
            "care": 5,
            "communication": 5,
            "valueForMoney": 4,
        },
        "nps": 10,
        "hireAgain": "sim",
        "improvements": "Excelente trabalho",
        "contact": "junior@email.com",
    }
    response = client.post("/surveys/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["gardenerName"] == "Carlos Silva"
    assert data["ratings"]["punctuality"] == 5
    assert data["nps"] == 10
    assert "id" in data
    assert "created_at" in data


def test_get_surveys():
    response = client.get("/surveys/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    assert data[0]["gardenerName"] == "Carlos Silva"


def test_create_survey_validation_error():
    invalid_payload = {"gardenerName": "Carlos Silva", "date": "data-invalida"}
    response = client.post("/surveys/", json=invalid_payload)
    assert response.status_code == 422
