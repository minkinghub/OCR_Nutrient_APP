import { sendingLogin, sendingSignUp } from "./sendData";
import { loadNutrient } from "./loadData";
import { DonutGraph } from "./DonutGraph";
import { BarGraph } from "./BarGraph";
import { LoadingComponent } from "./LoadingComponent";
import { UserProvider, useUser } from "./userContext";

module.exports = {
    sendingLogin,
    sendingSignUp,
    loadNutrient,
    DonutGraph,
    BarGraph,
    LoadingComponent,
    UserProvider,
    useUser
}