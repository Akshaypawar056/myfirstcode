import React from 'react';
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux';
import routes from '../../client/routes'
import  configureStore from '../../client/store';

export default function(req,res,next){

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
        const store = configureStore();
        const initialView = renderToString(
          <Provider store={store}>
              <RouterContext {...renderProps} />
          </Provider>
        );
        const finalState = store.getState();
        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderHTML(initialView, finalState));
          
    } else {
      res.status(404).send('Not found')
    }
  })
}


const renderHTML = (html, initialState) => {

  return `
    <!doctype html>
    <html>
      <head>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">

      </head>
      <body>
       <div class="container">
          <div id="root">${html}</div>
     </div>
       
     <script type="text/javascript" src="/bundle.js" charset="utf-8"></script>
     <link rel="stylesheet" href="/styles.css">
     <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
     <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
      </body>
    </html>
  `;
};