import { useFormik } from "formik";
import { useEffect } from "react";
import { Container, Input, Row, Col, Button } from "reactstrap";
import "./App.css";

function App() {
  const formik = useFormik({
    initialValues: {
      pliki: {},
    },
    //validate,
    onSubmit: () => console.log(formik),
  });

  useEffect(() => {
    if (formik.values.inputPliki) {
      const reader = new FileReader();
      let file = formik.values.inputPliki;
      reader.onloadstart = () => {
        formik.setFieldValue("pliki", {
          loading: true,
          file: undefined,
          name: formik.values.inputPliki.name,
        });
      };
      reader.onloadend = () => {
        formik.setFieldValue("pliki", {
          loading: false,
          file: formik.values.inputPliki,
          name: formik.values.inputPliki.name,
        });
      };
      reader.readAsDataURL(reader.result);
    }
  }, [formik.values.inputPliki]);

  return (
    <>
      <Container>
        <Row>
          <Col mt={4} className='mt-4'>
            <Input
              type='file'
              name='inputPliki'
              id='inputPliki'
              onChange={(e) => e.target.files[0]}
            />
            <Button type='Submit'>Wyślij</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
