/* eslint-disable react/no-unescaped-entities */
import { AddShoppingCartOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useGetproductByNameQuery } from "../../Redux/product";
import React, { useEffect, useState } from "react";

const ProductDetails = (props) => {

  const { data, error, isLoading } = useGetproductByNameQuery("products/" + props.id);
  const [mainImage, setMainImage] = useState(null);
  useEffect(() => {
    if (data && data.images.length > 0) {
      setMainImage(data.images[0].image);
    }
  }, [data]);


  if (data) {
    console.log(data);
  }

  if (isLoading) {
    return <Typography variant="h6">LOADING..............</Typography>;
  }

  if (error) {
    return (
      <Typography variant="h6">
        {" "}
        {
          // @ts-ignore
          error.message
        }
      </Typography>
    );
  }
  if (data) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2.5,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box sx={{ display: "flex" }}>
          <img width={300} src={mainImage} alt={`${data.images[0].alt}`} />
        </Box>

        <Box sx={{ textAlign: { xs: "center", sm: "left" } }}  >
          <Typography variant="h5">{data.name}</Typography>
          <Typography my={0.4} fontSize={"22px"} color={"crimson"} variant="h6">
            {data.price}
          </Typography>
          <Typography variant="body1">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>

          <Stack sx={{ justifyContent: { xs: "center", sm: "left" } }} direction={"row"} gap={1} my={2}>
            {data.images.map((img) => {
              return (

                <img
                  style={{
                    borderRadius: 3, cursor: "pointer",
                    opacity: mainImage === img.image ? 1 : 0.7,
                    border: mainImage === img.image ? "2px solidrgb(97, 93, 94)" : "none",
                    transition: "0.1s"
                  }}
                  height={100}
                  width={90}
                  key={img.id}
                  src={img.image}
                  onClick={() => setMainImage(img.image)}
                  alt={img.alt}
                />
              );

            })}

          </Stack>


          <Button sx={{ mb: { xs: 1, sm: 0 }, textTransform: "capitalize" }} variant="contained">
            <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />
            Buy now
          </Button>
        </Box>
      </Box>
    );
  };
};

export default ProductDetails;
