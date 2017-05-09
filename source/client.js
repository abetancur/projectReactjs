import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router';

import Pages from './Pages/containers/Page.jsx';

render(
    <BrowserRouter>
        <Pages />
    </BrowserRouter>,
    document.getElementById('render-target')
)
