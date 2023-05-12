import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Container, VStack, Heading, Stack, Menu, Button, MenuItem, MenuButton, MenuList, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Card, CardBody, Divider, Image, Text, CardFooter, ButtonGroup, SimpleGrid } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Pagination } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
const Home = () => {
    const [data, setData] = useState([])
    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [pageno, setPageno] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [subCategoryId, setSubCategoryId] = useState("")
    const [productId, setProductId] = useState("")

    /**
     * This function fetches data from an API endpoint and sets the retrieved data to various states
     * while handling loading, error, and success states.
     */
    const fetchCategories = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`https://beta.getreviews.buzz/grb/api/ProductsList?page=${pageno}&category_id=${categoryId}&subcategory_id=${subCategoryId}&token=a51eac7d16608d804c27c6bb8c1b509dc86417be54ff3ee5dc903990ab1a352f`, {
                auth: {
                    username: 'bittu@adaired.com',
                    password: 'Ad@12345'
                }
            })
            setData(data)
            setCategory(data.categories)
            setSubCategory(data.subcategories)
            setProducts(data.datas.data)
            console.log("data", data)
            setLoading(false)
            setSuccess(true)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(true)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    // Show products on page change
    useEffect(() => {
        fetchCategories()
    }, [pageno])

    // Show products on category change
    useEffect(() => {
        fetchCategories()
    }, [categoryId])

    // Show products on subcategory change
    useEffect(() => {
        fetchCategories()
    }, [subCategoryId])


    /**
     * The function removes HTML tags from a given string.
     * @returns The `removeHtmlTags` function is returning a string with all HTML tags removed from the
     * input `str`.
     */
    const removeHtmlTags = (str) => {
        return str.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');
      }

    return (
        <Container maxW={'container'}>
            <VStack align={'stretch'}>
                <Box>
                    <Heading as="h1" size="xl" color={'#aaa'} textAlign={'center'} p={5}>
                        Welcome to GetReviewsBuzz
                    </Heading>
                </Box>
            </VStack>

            <Stack direction={'row'} >
                <Box >
                    <Heading as="h2" size="lg" color={'#aaa'} p={5} textAlign={'center'}>
                        Categories
                    </Heading>
                    <Menu>
                        {category.map((cat) => (
                            <Menu key={cat.id} colorScheme="blue" size="lg" p={3} m={3} color={'#aaa'}>
                                <Accordion allowToggle minW={'18rem'}>
                                    <AccordionItem>
                                        <AccordionButton>
                                            <Box flex="1" textAlign="left" >
                                                {cat.name}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        <AccordionPanel pb={4}>
                                            {subCategory.filter(subcat => subcat.parent_id === cat.id).map((subcat) => (
                                                <MenuItem key={subcat.id} colorScheme="blue" size="lg" p={2} m={2} color={'#aaa'} display={'block'} >
                                                    <Box onClick={() => {
                                                        setSubCategoryId(subcat.id);
                                                    }}>
                                                        <ChevronRightIcon />
                                                        {subcat.name}
                                                    </Box>
                                                </MenuItem>
                                            ))}
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>

                            </Menu>
                        ))}
                    </Menu>
                </Box>

                <Box>
                    <SimpleGrid columns={[1, null, 4]} spacing='40px'>
                        {
                            loading ? <h1>Loading...</h1> : error ? <h1>Error...</h1> :
                                products.map((product) => (

                                    <Link to={`/product/${product.id}/${product.is_multiple_price}`} key={product.id}>
                                    <Card maxW={'sm'} key={product.id} >
                                        <CardBody>
                                            <Image src={"https://beta.getreviews.buzz/grb/" + product.attachment.media_url} alt={product.name} borderRadius='lg' h={'100px'} />
                                            <Stack mt='6' spacing='3'>
                                                <Heading size={'md'}>{product.title}</Heading>
                                                <Text color={'gray.500'}>{removeHtmlTags(product.content)}
                                                </Text>
                                                <Text color={'blue.500'} fontSize='2xl'>{"$" + product.price}</Text>
                                            </Stack>
                                        </CardBody>
                                        <Divider />
                                        <CardFooter>
                                            <ButtonGroup spacing='2'>
                                                <Button variant='solid' colorScheme='blue'>
                                                    Buy now
                                                </Button>
                                                <Button variant='ghost' colorScheme='blue'>
                                                    Add to cart
                                                </Button>
                                            </ButtonGroup>
                                        </CardFooter>
                                    </Card>
                                    </Link>

                                ))
                        }
                    </SimpleGrid>
                </Box>
            </Stack>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={5}

            >
                <Pagination defaultActivePage={1} totalPages={data.max_pages} onPageChange={(e, data) => {
                    console.log(data.activePage);
                    setPageno(data.activePage);
                }} />
            </Box>
        </Container>

    )
}

export default Home


