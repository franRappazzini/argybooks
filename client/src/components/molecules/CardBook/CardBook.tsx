import "./CardBook.scss";

import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";

import { CompleteBook } from "../../../utils/interfaces";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import { useState } from "react";

function CardBook({ id, image, name, author, year, language }: CompleteBook) {
  const [favorite, setFavorite] = useState<boolean>(false);

  const handleToggleFavorite = () => setFavorite(!favorite);

  return (
    <Card sx={{ width: "100%" }} className="card_book">
      <CardContent>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 5fr", gridGap: "1rem" }}>
          <div
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "8rem",
            }}
          ></div>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Box>
              <div className="header_title">
                <CustomLink to={`/book/${id}`} text={name} color="inherit" variant="h5" />

                <IconButton
                  aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                  onClick={handleToggleFavorite}
                >
                  {favorite ? <Favorite color="error" /> : <FavoriteBorderOutlined />}
                </IconButton>
              </div>

              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {author.name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography variant="body2" sx={{ marginRight: "1.5rem" }}>
                Año: {year}
              </Typography>
              <Typography variant="body2">Idioma: {language}</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CardBook;
