import React from 'react';
import Link from '@material-ui/core/Link';

import { Routes } from '../core/_enum/Routes';

const HomePage: React.FC = () => {
    return (
        <div>
            Home
            <br/>
            <Link href={Routes.SUBSCRIPTION}>Inscriptions</Link>
        </div>
    );
}

export default HomePage;
