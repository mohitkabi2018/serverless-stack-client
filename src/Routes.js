import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import Settings from "./containers/Settings";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      
      <Route exact path="/signup">
        <Signup />
      </Route>

      <Route exact path="/settings">
        <Settings />
      </Route>

      <Route exact path="/notes/new">
        <NewNote />
      </Route>

      <Route exact path="/notes/:id">
        <Notes />
      </Route>

      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>

      <UnauthenticatedRoute exact path="/signup">
        <Signup />
      </UnauthenticatedRoute>

      <AuthenticatedRoute exact path="/settings">
        <Settings />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/notes/new">
        <NewNote />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/notes/:id">
        <Notes />
      </AuthenticatedRoute>

      <Route component={NotFound} />
    </Switch>
  );
}
