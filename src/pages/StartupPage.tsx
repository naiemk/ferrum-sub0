import {PageType} from '../redux/AppState';
import {PageContent} from '../components/PageContent';
import {FormattedMessage} from 'react-intl';
import {Button, WhiteSpace} from 'antd-mobile-rn';
import React from 'react';
import {Page} from '../components/Page';
import {Image} from 'react-native';
import logo from '../assets/sub0-header.png';
import {Panel} from '../components/Panel';

export const StartupPage: React.StatelessComponent<{onNextPage: (p: PageType) => void}> = props => (
    <Page
        showHeader={true}
        title = {
            <Image source={logo} />
        }
    >
        <PageContent>
            <Panel>
                <Panel.Body>
                    <FormattedMessage id='app.setupDescription'/>
                </Panel.Body>
            </Panel>
            <WhiteSpace/>
            <Button onClick={() => props.onNextPage('startup')}>
                <FormattedMessage id='btn.setup'/>
            </Button>
        </PageContent>
    </Page>
);