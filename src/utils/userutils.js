import { GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import Polyline from "@mapbox/polyline";
const apiKey = 'AIzaSyDhN44UBYGNpQ4tZeKxNQCgI9602rB1Kr8';

export default function getFacebookProfile(accessToken): Promise {
  return new Promise((resolve, reject) => {
    const profileRequest = new GraphRequest(
      "/me",
      {
        parameters: {
          fields: {
            string: "email,name,first_name"
          },
          access_token: {
            string: accessToken.toString()
          }
        }
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  });
}

export async function getDirections(origin, destination): Promise {
  try {
    // console.log("Here Direction")
    origin = `${origin.latitude},${origin.longitude}`; // eslint-disable-line
    // console.log(origin,"inside getDirections")
    // console.log(apiKey,"Key@@@")
    destination = `${destination._latitude},${destination._longitude}`; // eslint-disable-line
    // const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}`;
    const url = 
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`
  
    const resp = await fetch(url);
    // console.log(resp,"inside Resp")
    const respJson = await resp.json();
    // console.log(respJson,"inside Resp1")
    const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
    // console.log(points,"POints!!!!!!!!!!!!")
    const distance = respJson.routes[0].legs
      .map(leg => leg.distance.value)
      .reduce((a, c) => a + c);
    const coords = points.map(point => ({
      latitude: point[0],
      longitude: point[1]
    }));
    return { coordinates: coords, distance };
  } catch (error) {
    console.log(error,"eroorMethod")
    return { error: true, errorMessage: error };
  }
}

export async function getDirection(origin, destination): Promise {
  try {
    // console.log("Here Direction")
    // console.log(origin,"before change origin direction")
    origin = `${origin._latitude},${origin._longitude}`; // eslint-disable-line
    // console.log(origin,"inside after getDirections direction")
    // console.log(apiKey,"Key@@@")
    // console.log(destination,'before change in getDirection direction')
    destination = `${destination.latitude},${destination.longitude}`; // eslint-disable-line
    // console.log(destination,"after change getDirection direction")
    // const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}`;
    const url = 
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`
  
    const resp = await fetch(url);
    // console.log(resp,"inside Resp")
    const respJson = await resp.json();
    // console.log(respJson,"inside Resp1")
    const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
    // console.log(points,"POints!!!!!!!!!!!!")
    const distance = respJson.routes[0].legs
      .map(leg => leg.distance.value)
      .reduce((a, c) => a + c);
    const coords = points.map(point => ({
      latitude: point[0],
      longitude: point[1]
    }));
    return { coordinates: coords, distance };
  } catch (error) {
    console.log(error,"eroorMethod")
    return { error: true, errorMessage: error };
  }
}

