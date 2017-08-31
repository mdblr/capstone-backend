#SCRL Backend

Post endpoint: http://sea-crisis-resource.herokuapp.com/api/nearby

Returns material, health, and human resources within one mile radius. Data includes hours of operation, descriptions, address, and more.

Example: 

curl -H "Content-Type: application/json" -X POST -d '{"addr": "3rd and Pine, Seattle WA"}' http://sea-crisis-resource.herokuapp.com/api/nearby

#### Related Repos  
[Frontend](https://github.com/mdblr/Seattle-Crisis-Resource-Locator-frontend)  
[Database](https://github.com/mdblr/scrl-db)  
