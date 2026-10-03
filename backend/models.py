from sqlalchemy import Column, Integer, String, Date, Text, JSON, DateTime
from sqlalchemy.sql import func
from database import Base


class Survey(Base):
    __tablename__ = "surveys"

    id = Column(Integer, primary_key=True, index=True)
    gardener_name = Column(String, index=True)
    services = Column(JSON)
    date = Column(Date, nullable=True)
    rating_punctuality = Column(Integer)
    rating_quality = Column(Integer)
    rating_cleanliness = Column(Integer)
    rating_care = Column(Integer)
    rating_communication = Column(Integer)
    rating_value_for_money = Column(Integer)
    nps = Column(Integer, nullable=True)
    hire_again = Column(String)
    improvements = Column(Text, nullable=True)
    contact = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
