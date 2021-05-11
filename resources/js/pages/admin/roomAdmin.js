import React from "react";
import { Formik, Form, Field } from "formik";

const roomAdmin = () => {
    const bg = useColorModeValue("white", "blue.300");
    const color = useColorModeValue("bluet.900", "gray.800");

    const [succesAdd, setSuccesAdd] = useState(false);
    const [errorAdd, setErrorAdd] = useState(false);
    const [freeRooms, setFreeRooms] = useState([]);
    const [groups, Setgroups] = useState([]);
    const [error, setError] = useState("");

    const validationSchema = Yup.object({

    });
    useEffect(() => {
        const fetchGroup = async () => {
            await axios
                .get("/api/group")
                .then((ress) => {
                    Setgroups(ress.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchGroup();
    }, []);

    return (
        <>
            <Formik
                initialValues={{
                    name: "",
                    surname: "",
                    patronymic: "",
                    birthday: "",
                }}
                onSubmit={(values, actions) => {

                    axios
                        .post("/api/student", values)
                        .then((res) => {
                            //console.log(res);
                            setSuccesAdd(
                                "Операция успешна " +
                                    res.data.name +
                                    " " +
                                    JSON.stringify(res.data.message)
                            );
                            actions.resetForm();
                        })
                        .catch((err) => {
                            if (err.response) {
                                console.log(err.response.data);
                                console.log(err.response.status);
                                console.log(err.response.headers);
                            }
                            console.log(err);
                            let toStringgg =
                                "Error " +
                                err.response.status +
                                " " +
                                JSON.stringify(err.response.data.message);
                            setError(toStringgg);
                        });
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
                validationSchema={validationSchema}
            >
                {(formik) => (
                    <Form onSubmit={formik.handleSubmit}>
                        <Flex
                            bg={bg}
                            justify="center"
                            mx="5%"
                            p="20px"
                            borderRadius="1%"
                            flexWrap="wrap"
                        >
                            <Box px="5" mb="5">
                                {error && <ErrorMessage message={error} />}
                                {succesAdd && (
                                    <SuccesMessage message={succesAdd} />
                                )}
                                <Heading as="h5" size="md" color="#8B8B8B">
                                    Общая информация
                                </Heading>
                                <Box
                                    border="4px"
                                    borderRadius="16px"
                                    borderColor="rgba(139,139,139,0.5)"
                                    p="10px"
                                >
                                    <Textfield
                                        type="text"
                                        name="name"
                                        placeholder="Фамилия"
                                        isRequired={true}
                                    />

                                </Box>
                            </Box>

                                <button type="submit">Submit</button>
                                <Button type="reset">Reset</Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default roomAdmin;
