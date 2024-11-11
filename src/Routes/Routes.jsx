
import { Switch, Route } from "react-router"
import { HotelDetails } from "../Components/HotelDetails/Components/HotelDetails"
import Login from "../Components/Login/Login"
import { SearchPage } from "../Components/SearchPage/SearchPage"
import { Home } from "./Home"
import { Restaurant } from "./Restaurant"
import { SearchRestaurantPage } from "../Components/Restaurant/SearchPage/SearchRestaurantPage"
import { RestaurantDetails } from "../Components/Restaurant/RestaurantDetail/Components/RestaurantDetail"
import { SearchCarPage } from "../Components/Car/SearchPage/SearchCarPage"
import Car from "./Car"
import CarDetail from "../Components/Car/CarDetail/CarDetail"
import Attraction from "./Attraction"
import { SearchAttractionPage } from "../Components/Attraction/SearchPage/SearchAttractionPage"
import AttractionDetail from "../Components/Attraction/AttractionDetail/AttractionDetail"

export const Routes = () => {

    return <>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route path="/restaurant/:id">
                <RestaurantDetails />
            </Route>
            <Route path="/restaurant">
                <Restaurant />
            </Route>

            <Route exact path="/login">
                <Login />
            </Route>

            <Route exact path="/search">
                <SearchPage />
            </Route>

            <Route exact path="/searchRestaurant">
                <SearchRestaurantPage />
            </Route>

            <Route path="/search/:id">
                <HotelDetails />
            </Route>

            <Route exact path="/car">
                <Car />
            </Route>

            <Route exact path="/searchCar">
                <SearchCarPage />
            </Route>

            <Route path="/car/:id">
                <CarDetail />
            </Route>

            <Route exact path="/attraction">
                <Attraction />
            </Route>

            <Route exact path="/searchAttraction">
                <SearchAttractionPage />
            </Route>

            <Route path="/attraction/:id">
                <AttractionDetail />
            </Route>

        </Switch>

    </>

}