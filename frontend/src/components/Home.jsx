import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Container, VStack, Heading, Stack, Menu, Button, MenuItem, MenuButton, MenuList, Card, CardBody, Divider, Image, Text, CardFooter, Grid, ButtonGroup, GridItem, SimpleGrid } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Pagination } from 'semantic-ui-react'
const Home = () => {
    const [data, setData] = useState([])
    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [pageno, setPageno] = useState("1")
    const [categoryId, setCategoryId] = useState("")
    console.log("page", pageno)

    // fetch categories
    const fetchCategories = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`https://beta.getreviews.buzz/grb/api/ProductsList?page=${pageno}&category_id=${categoryId}&subcategory_id&token=a51eac7d16608d804c27c6bb8c1b509dc86417be54ff3ee5dc903990ab1a352f`, {
                auth: {
                    username: 'bittu@adaired.com',
                    password: 'Ad@12345'
                }
            })
            setData(data)
            setCategory(data.categories)
            setSubCategory(data.subcategories)
            setProducts(data.datas.data)
            // console.log("categories", data.categories)
            // console.log("subCategories", data.subcategories)
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
                                <MenuButton key={cat.id} colorScheme="blue" size="lg" p={2} m={2} color={'#aaa'} display={'block'}>
                                    <Box as="span" color={'#aaa'} >{cat.name}</Box>
                                    <ChevronRightIcon />
                                </MenuButton>
                                <MenuList >
                                    {subCategory.filter(subcat => subcat.parent_id === cat.id).map((subcat) => (
                                        <MenuItem key={subcat.id} colorScheme="blue" size="lg" p={2} m={2} color={'#aaa'} display={'block'} >
                                            {subcat.name}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                        ))}
                    </Menu>
                </Box>

                <Box>
                    <SimpleGrid columns={[1, null, 4]} spacing='40px'>
                        {
                            loading ? <h1>Loading...</h1> : error ? <h1>Error...</h1> :
                                products.map((product) => (
                                    
                                    <Card maxW={'sm'} key={product.id}>
                                        <CardBody>
                                            <Image src={"https://beta.getreviews.buzz/grb/" + product.attachment.media_url} alt={product.name} borderRadius='lg' h={'100px'} />
                                            <Stack mt='6' spacing='3'>
                                                <Heading size={'md'}>{product.title}</Heading>
                                                <Text color={'gray.500'}>{product.content.substring(0, 20).concat('...')}</Text>
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
                    console.log("pageno", pageno);
                    // fetchCategories();
                }} />
            </Box>
        </Container>

    )
}

export default Home


