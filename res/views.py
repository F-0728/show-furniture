from django.http import HttpResponse
import json


def index(request):
    f = open("./furniture.json", "r", encoding="UTF-8")
    data = json.load(f)
    f.close()
    json_string = json.dumps(data, ensure_ascii=False, indent=4)

    return HttpResponse(json_string, content_type="application/json")

