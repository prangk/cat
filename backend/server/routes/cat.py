from fastapi import APIRouter, Body
# from fastapi.encoders import jsonable_encoder

from ..databases.cat import (
    # add_cat,
    # delete_cat,
    # retrieve_cat,
    retrieve_cats,
    # update_cat,
)
from ..models.cat import (
    # ErrorResponseModel,
    ResponseModel,
    # CatSchema,
    # UpdateCatModel,
)

router = APIRouter()
# @router.post("/", response_description="cat data added into the database")
# async def add_cat_data(cat: CatSchema = Body(...)):
#     cat = jsonable_encoder(cat)
#     new_cat = await add_cat(cat)
#     return ResponseModel(new_cat, "cat addd successfully.")

@router.get("/", response_description="cats retrieved")
async def get_cats():
    cats = await retrieve_cats()
    if cats:
        return ResponseModel(cats, "cats data retrieved successfully")
    return ResponseModel(cats, "Empty list returned")


# @router.get("/{id}", response_description="cat data retrieved")
# async def get_cat_data(id):
#     cat = await retrieve_cat(id)
#     if cat:
#         return ResponseModel(cat, "cat data retrieved successfully")
#     return ErrorResponseModel("An error occurred.", 404, "cat doesn't exist.")

# @router.put("/{id}")
# async def update_cat_data(id: str, req: UpdatecatModel = Body(...)):
#     req = {k: v for k, v in req.dict().items() if v is not None}
#     updated_cat = await update_cat(id, req)
#     if updated_cat:
#         return ResponseModel(
#             "cat with ID: {} name update is successful".format(id),
#             "cat name updated successfully",
#         )
#     return ErrorResponseModel(
#         "An error occurred",
#         404,
#         "There was an error updating the cat data.",
#     )

# @router.delete("/{id}", response_description="cat data deleted from the database")
# async def delete_cat_data(id: str):
#     deleted_cat = await delete_cat(id)
#     if deleted_cat:
#         return ResponseModel(
#             "cat with ID: {} removed".format(id), "cat deleted successfully"
#         )
#     return ErrorResponseModel(
#         "An error occurred", 404, "cat with id {0} doesn't exist".format(id)
#     )