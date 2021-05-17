import React from 'react';
import Link from '@material-ui/core/Link';

import { Routes } from '../core/_enum/Routes';

const ActivitiesPage: React.FC = () => {
    return (
        <div>
            Activités
            <br/>
            <Link href={Routes.HOME}>back to home</Link>
        </div>
    )
}

export default ActivitiesPage;
