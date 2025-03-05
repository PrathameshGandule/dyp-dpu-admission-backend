# /api/gate/form
```json
{
    "firstname": "prathamesh",
    "lastname": "gandule",
    "phone": "5612324578",
    "email": "abc@gmail.com",
    "purpose": "inquiry",
    "stream": "eng"
}
```
# /api/desk/1/update/:id
```json
{
    "fatherName": "Rajesh Sharma",
    "motherName": "Sunita Sharma",
    "gender": "male",
    "nationality": "Indian",
    "category": "General",
    "address": "123, MG Road, Pune",
    "pinCode": "411001",
    "sscBoard": "Maharashtra State Board",
    "sscYear": "2020",
    "sscMarks": "450",
    "sscOutOf": "500",
    "sscPercentage": "90",
    "hscBoard": "Maharashtra State Board",
    "hscYear": "2022",
    "hscPhysics": "85",
    "hscChemistry": "80",
    "hscMaths": "90",
    "hscTotalMarks": "255",
    "hscPercentage": "85",
    "jeeYear": "2023",
    "jeePercentage": "75",
    "cetYear": "2023",
    "cetPercentage": "78",
    "enrollmentId": "EN24A1023",
    "branch": "Computer Science",
    "remarks": "Needs to submit documents",
    "campusVisit": true,
    "cafeteriaVisit": false,
    "sportsFacilityVisit": true,
    "labVisit": true,
    "classroomVisit": true
}
```
# /api/auth/login
```json
{
    "username": "desk1-1",
    "password": "123",
    "type": "desk1"
}
{
    "username": "gate-pc-1",
    "password": "123",
    "type": "gate",
}
```