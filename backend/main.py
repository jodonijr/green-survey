from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Green Survey API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/surveys/", response_model=schemas.SurveyResponse)
def create_survey(survey: schemas.SurveyCreate, db: Session = Depends(get_db)):
    db_survey = models.Survey(
        gardener_name=survey.gardenerName,
        services=survey.services,
        date=survey.date,
        rating_punctuality=survey.ratings.punctuality,
        rating_quality=survey.ratings.quality,
        rating_cleanliness=survey.ratings.cleanliness,
        rating_care=survey.ratings.care,
        rating_communication=survey.ratings.communication,
        rating_value_for_money=survey.ratings.valueForMoney,
        nps=survey.nps,
        hire_again=survey.hireAgain,
        improvements=survey.improvements,
        contact=survey.contact,
    )

    db.add(db_survey)
    db.commit()
    db.refresh(db_survey)

    return db_survey


@app.get("/surveys/", response_model=list[schemas.SurveyResponse])
def get_surveys(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    surveys = db.query(models.Survey).offset(skip).limit(limit).all()

    result = []
    for s in surveys:
        result.append(
            {
                "id": s.id,
                "gardenerName": s.gardener_name,
                "services": s.services,
                "date": s.date,
                "ratings": {
                    "punctuality": s.rating_punctuality,
                    "quality": s.rating_quality,
                    "cleanliness": s.rating_cleanliness,
                    "care": s.rating_care,
                    "communication": s.rating_communication,
                    "valueForMoney": s.rating_value_for_money,
                },
                "nps": s.nps,
                "hireAgain": s.hire_again,
                "improvements": s.improvements,
                "contact": s.contact,
            }
        )
    return result
