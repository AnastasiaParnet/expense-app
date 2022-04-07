import type { BrowserHistory } from 'history';
import React, { useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';

export interface HistoryRouterProps {
    history: BrowserHistory;
    basename?: string;
    children?: React.ReactNode;
}

export const HistoryRouter = ({
    basename,
    children,
    history,
}: HistoryRouterProps): JSX.Element => {
    const [state, setState] = useState({
        action: history.action,
        location: history.location,
    });

    useLayoutEffect(() => history.listen(setState), [history]);

    return (
        <Router
            basename={basename}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        >
            {children}
        </Router>
    );
};
