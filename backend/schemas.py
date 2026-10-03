from pydantic import BaseModel
from typing import List, Optional
from datetime import date


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
    date: Optional[date] = None
    ratings: Ratings
    nps: Optional[int] = None
    hireAgain: str
    improvements: Optional[str] = None
    contact: Optional[str] = None


class SurveyResponse(SurveyCreate):
    id: int

    class Config:
        from_attributes = True
