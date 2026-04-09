const express=require("express");
const db = require("./db");

const app=express();

app.use(express.json());

app.post("/addSchool", (req,res)=>{

    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || latitude == null || longitude == null) {
        return res.status(400).json({ message: "All fields required" });
    }

    if (typeof name !== "string" || typeof address !== "string") {
    return res.status(400).json({ message: "Name and address must be strings" });
}


    if (typeof latitude !== "number" || typeof longitude !== "number") {
        return res.status(400).json({ message: "Latitude and Longitude must be numbers" });
    }

    const sql = "INSERT INTO schools (name,address,latitude,longitude) VALUES (?,?,?,?)";

    db.query(sql, [name, address, latitude, longitude], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }
    
    res.json({message: "School has been added successfully"});
    });
});


app.get("/listSchools", (req,res)=>{
    const{latitude, longitude}=req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: "Location required" });
    }

     db.query("SELECT * FROM schools", (err, schools) => {

        if (err) {
            return res.status(500).json(err);
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        schools.forEach(school => {

            const dLat = school.latitude - userLat;
            const dLon = school.longitude - userLon;

            school.distance = Math.sqrt(dLat * dLat + dLon * dLon);
        });

        schools.sort((a, b) => a.distance - b.distance);

        res.json(schools);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
