import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Product } from '@prisma/client'
import React from 'react'

const ProductItem = ({name,description}:Product) => {
    return (
        <Grid item md={2}>
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
                    <Typography noWrap variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">
                        <Typography variant="body2">
                            Add to cart
                        </Typography>
                    </Button>
                    <Button size="small">
                        <Typography variant="body2">
                            Learn More
                        </Typography>
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ProductItem;
