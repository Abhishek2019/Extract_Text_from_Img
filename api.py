from PIL import Image
import pyocr.builders
from flask import Flask, request
from flask_restful import Resource, Api
import base64

# with open("testImg/test_1.jpg", "rb") as image_file:
#     img_data = base64.b64encode(image_file.read())
# print(img_data)

app = Flask(__name__)
api = Api(app)

tools = pyocr.get_available_tools()
tool = tools[0]
langs = tool.get_available_languages()
lang = langs[0]


class ExtractImg(Resource):

    def post(self):
        req_data = request.get_json()

        img_data = req_data["img"]

        with open("testImg/imageToSave.png", "wb") as fh:
            fh.write(base64.decodebytes(img_data))

        txt = tool.image_to_string(
                Image.open("testImg/imageToSave.png"),
                lang=lang,
            builder=pyocr.builders.TextBuilder()
        )

        return ({"output":txt})


api.add_resource(ExtractImg,"/getText")

app.run(host='127.0.0.1', port = '2935', debug = True)


