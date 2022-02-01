import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Product } from '@prisma/client'
import React from 'react'

const ProductItem = ({name,description,price,stockAmount}:Product) => {
    const stockText = stockAmount===0?"Out of Stock!":`In Stock: ${stockAmount}`;
    return (
        <Grid item md={2.5}>
            <Card>
                <CardMedia
                    component="img"
                    height="120"
                    image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                    alt="burger"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {name}
                    </Typography>
                    <Box sx={{ display: 'flex',flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Typography component="div" color="primary" variant="body2" >
                            &euro;{Number(price).toFixed(2)}
                        </Typography>
                        <Typography component="div" color="primary" variant="body2" >
                            {stockText}
                        </Typography>
                    </Box>
                   
                    <Typography noWrap variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'space-between' }}>
                    <Button variant="contained" size="small" >
                        <Typography style={{fontSize:'12px'}}>
                            Add to cart
                        </Typography>
                    </Button>
                    <Button variant="outlined" size="small" >
                        <Typography style={{fontSize:'12px'}} >
                            Learn More
                        </Typography>
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ProductItem;
