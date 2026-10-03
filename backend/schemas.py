from pydantic import BaseModel
from typing import List, Optional
from datetime import date as dt_date, datetime as dt_datetime


class Ratings(BaseModel):
    punctuality: int
    quality: int
    cleanliness: int
    care: int
    communication: int
    valueForMoney: int


class SurveyCreate(BaseModel):
    gardenerName: str
    services: List[str]
    date: Optional[dt_date] = None
    ratings: Ratings
    nps: Optional[int] = None
    hireAgain: str
    improvements: Optional[str] = None
    contact: Optional[str] = None


class SurveyResponse(SurveyCreate):
    id: int
    created_at: dt_datetime

    class Config:
        from_attributes = True
