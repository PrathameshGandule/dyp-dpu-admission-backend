# /api/gate/form
```json
{
    "firstname": "prathamesh",
    "lastname": "gandule",
    "phone": "5612324578",
    "email": "abc@gmail.com",
    "purpose": "inquiry",
    "stream": "eng",
    "visitors": "2"
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
    "hscMarks": "255",
    "hscOutOf": "500",
    "hscPercentage": "85",
    "jeeYear": "2023",
    "jeePercentile": "75",
    "cetYear": "2023",
    "cetPercentile": "78",
    "enrollmentId": "EN24A1023",
    "branch": "Computer Science",
    "remarks": "Needs to submit documents",
}
// desk2
{
    "campusVisit": true,
    "cafeteriaVisit": false,
    "sportsFacilityVisit": true,
    "labVisit": true,
    "classroomVisit": true,
    "remarks": "Good student"
}
```
# /api/auth/register
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