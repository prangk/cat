from typing import Optional

from pydantic import BaseModel, Field


class CatSchema(BaseModel):
    item: str = Field(...)
    class Config:
        schema_extra = {
            "example": {
                "breed_name": "CAT BREED",
                "image": "BASE64",
                "bg_image": "BASE64"

            }
        }


# class UpdateCatModel(BaseModel):
#     item: Optional[str]

#     class Config:
#         schema_extra = {
#             "example": {
#                 "item": "Thing to do",
#             }
#         }


def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}