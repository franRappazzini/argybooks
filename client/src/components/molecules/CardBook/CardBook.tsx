import "./CardBook.scss";

import { Box, Card, CardContent, Typography } from "@mui/material";

import { CompleteBook } from "../../../utils/interfaces";
import { Link } from "react-router-dom";

function CardBook({ id, image, name, author, year, language }: CompleteBook) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 5fr", gridGap: "1rem" }}>
          <div
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "8rem",
              // width: "100%",
            }}
          ></div>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography> */}
            <Box>
              <Typography variant="h5" component="div">
                <Link to={`/book/${id}`} className="link_card-book">
                  {name}
                </Link>
              </Typography>
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
