import './ModuleStart.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function ModuleStart({children}) {
    return (
        <>
            <Container className="os101_simpleModuleStart" fluid={true}>
                <Row><h2 style={{padding: 0}}>Navigation</h2></Row>
                <Row xs={1} md={2} lg={3}>
                    {children}
                </Row>
            </Container>
        </>
    );
}

export default ModuleStart;