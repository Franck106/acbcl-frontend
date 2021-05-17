import React from 'react';
import Link from '@material-ui/core/Link';

import { Routes } from '../core/_enum/Routes';
import ActivitySubscribe from '../components/activity-subscribe';

const SubscriptionPage: React.FC = () => {
    return (
        <div>
            Inscriptions
            <br/>
            <Link href={Routes.HOME}>back to home</Link>
            <ActivitySubscribe/>
        </div>
    )
}

export default SubscriptionPage;
