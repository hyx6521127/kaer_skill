import React from 'react'
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import Layout from "Layout"

export default function root(): JSX.Element {
    return <Router>
    <Switch>
      <Route path="/" component={Layout} />
    </Switch>
  </Router>
}