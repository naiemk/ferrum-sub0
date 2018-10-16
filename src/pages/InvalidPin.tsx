import React from 'react';
import {Page} from '../components/Page';
import {Image} from 'react-native';
import logo from '../assets/sub0-header.png';
import {PageContent} from '../components/PageContent';
import {Panel} from '../components/Panel';
import {Button, WhiteSpace} from 'antd-mobile-rn';
import {FormattedMessage} from 'react-intl';

export const InvalidPinPage: React.StatelessComponent<{onNextPage: () => void}> = props => (
    <Page
        showHeader={true}
        title = {
            <Image source={logo} />
        }
    >
        <PageContent>
            <Panel>
                <Panel.Body>
                    <WhiteSpace/>
                    <FormattedMessage id='app.invalidPinDescription'/>
                    <WhiteSpace/>
                </Panel.Body>
            </Panel>
            <WhiteSpace/>
            <Button onClick={() => props.onNextPage()}>
                <FormattedMessage id='btn.tryAgain'/>
            </Button>
        </PageContent>
    </Page>
);
