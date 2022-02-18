const express = require("express")
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Grid = require("gridfs-stream")
const connection = require("./db")
const path = require("path")
dotenv.config();
let gfs;
connection();

const userRouter = require("./Routers/userRouter");
const categoryRouter = require('./Routers/categoryRouter');
const advertRouter = require('./Routers/advertRouter')
const premiumRouter = require("./Routers/premiumRouter")
const socialRouter = require("./Routers/usersocialRouter")
const adminAuthRouter = require("./Routers/adminRouter")
const aboutRouter = require("./Routers/aboutRouter")
const typeRouter = require("./Routers/typeRouter")
const subtypeRouter = require("./Routers/subtypeRouter")
const ratingRouter = require("./Routers/rateRouter")
const feedbackRouter = require("./Routers/feedbackRouter")
const subCategoryRouter = require("./Routers/subcategoryRouter")
const conversationRouter = require("./Routers/conversationRouter")
const messageRouter = require("./Routers/messageRouter")
const subpremiumcategoryRouter = require("./Routers/subpremiumcategoryRouter")
const packageRouter = require("./Routers/packageRouter")
const packagefeatureRouter = require("./Routers/packagefeatureRouter")
const formcontrollRouter = require("./Routers/formcontrollRouter")
const stateRouter = require("./Routers/stateRouter")
const cityRouter = require("./Routers/cityRouter")
const balanceRouter = require("./Routers/balenceHistoryRouter")
const bussinessRouter = require("./Routers/BussinessRouter")


//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

/* mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected Successfuly")
}).catch(() => {
    console.log("Opps!!! Error in Connection");
}) */

app.use("/api/v1/user", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/advert", advertRouter);
app.use("/api/v1/premium", premiumRouter);
app.use("/api/v1/socialmedia", socialRouter);
app.use("/api/v1/admin", adminAuthRouter);
app.use("/api/v1/subcategory", subCategoryRouter);
app.use("/api/v1/about", aboutRouter);
app.use("/api/v1/type", typeRouter);
app.use("/api/v1/subtype", subtypeRouter);
app.use("/api/v1/rate", ratingRouter);
app.use("/api/v1/feedback", feedbackRouter);
app.use("/api/v1/conversation", conversationRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/subpremiumcategory", subpremiumcategoryRouter);
app.use("/api/v1/package", packageRouter);
app.use("/api/v1/packagefeature", packagefeatureRouter);
app.use("/api/v1/formcontrol", formcontrollRouter);
app.use("/api/v1/state", stateRouter);
app.use("/api/v1/city", cityRouter);
app.use("/api/v1/balence", balanceRouter);
app.use("/api/v1/bussiness", bussinessRouter);


app.get("/", (req, res) => {
    res.send("This is Classified Application");
})



app.use('/uploads', express.static('uploads'))
const port = process.env.PORT || 8086;

app.listen(port, () => {
    console.log(`We are running on port ${port}`);
})
/* module.exports = app */