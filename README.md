#SCRL Backend

Post endpoint: http://sea-crisis-resource.herokuapp.com/api/nearby
Accepts JSON: {"addr":"your address"}
Returns material, health, and human resources within one mile radius

Example: 

curl -H "Content-Type: application/json" -X POST -d '{"addr": "3rd and Pine, Seattle WA"}' http://sea-crisis-resource.herokuapp.com/api/nearby

#### Related Repos  
[Frontend](https://github.com/mdblr/Seattle-Crisis-Resource-Locator-frontend)  
[Database](https://github.com/mdblr/scrl-db)  
