import requests

print("STARTED")

API_KEY = "5WSHCVCOX1CA4DPFRDMBEGZIIND5EJG2YHOABRD0HSDI0E32"

headers = {
    "Authorization": API_KEY
}

url = "https://api.foursquare.com/v3/places/search"

params = {
    "query": "salon",
    "near": "Hyderabad",
    "limit": 5
}

response = requests.get(
    url,
    headers=headers,
    params=params
)

print("Status Code:", response.status_code)
print(response.json())