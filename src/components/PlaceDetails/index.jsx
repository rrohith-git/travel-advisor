import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import BikeIcon from '@material-ui/icons/DirectionsCar';
import VerifiedIcon from '@material-ui/icons/VerifiedUser';
import GppBadIcon from '@material-ui/icons/Warning';

import useStyles from './styles';

const PlaceDetails = ({ place, selected, refProp, type }) => {

    const classes = useStyles();

    if (selected) {
        refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return (
        <Card elevation={6}>
            <CardMedia
                style={{ height: 350 }}
                image={type === 'airbnb' ? place?.images?.[0] : place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                title={type === 'airbnb' ? place.listingName : place.name}
            />
            <CardContent>
                <Typography gutterBottom variant='h5'>{type === 'airbnb' ? place.listingName : place.name}</Typography>
                {type === 'airbnb' ?
                    place?.avgRating && (<Box display="flex" justifyContent="space-between" my={1}>
                        <Rating name="read-only" value={Number(place.avgRating)} readOnly />
                        <Typography>{place.reviewsCount} review{place.reviewsCount > 1 && 's'}</Typography>
                    </Box>) :
                    (place?.rating && <Box display="flex" justifyContent="space-between" my={1}>
                        <Rating name="read-only" value={Number(place.rating)} readOnly />
                        <Typography>{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
                    </Box>)}
                {/* {place?.rating && <Box display="flex" justifyContent="space-between" my={1}>
                    <Rating name="read-only" value={Number(place.rating)} readOnly />
                    <Typography>{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
                </Box>} */}
                {/* {place?.price_level && <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Price Level</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
                </Box>} */}
                {type === 'airbnb' && place?.verified?.badgeSecondaryText === 'Verified' ?
                    (<Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>Price</Typography>
                        <Typography gutterBottom variant='subtitle1'>{place.accessibilityLabel}</Typography>
                    </Box>) :
                    (<Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>Price</Typography>
                        <Typography gutterBottom variant='subtitle1'>{place.accessibilityLabel}</Typography>
                    </Box>)}
                {type !== 'airbnb' && place?.ranking && <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Ranking</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
                </Box>}
                {type === 'airbnb' ?
                    place?.localizedDistanceText && (<Box display='flex' justifyContent='space-between'>
                        <BikeIcon />
                        <Typography gutterBottom variant='subtitle1'>{place.localizedDistanceText}</Typography>
                    </Box>) :
                    place?.distance_string && (<Box display='flex' justifyContent='space-between'>
                        <BikeIcon />
                        <Typography gutterBottom variant='subtitle1'>{place.distance_string}</Typography>
                    </Box>)}
                {/* {place?.distance_string && <Box display='flex' justifyContent='space-between'>
                    <BikeIcon />
                    <Typography gutterBottom variant='subtitle1'>{place.distance_string}</Typography>
                </Box>} */}
                {type !== 'airbnb' && place?.awards?.map((award, i) => (
                    <Box key={i} my={1} display='flex' justifyContent='space-between' alignItems='center'>
                        <img src={award.images.small} alt={award.display_name} />
                        <Typography variant='subtitle2' color='textSecondary' >{award.display_name}</Typography>
                    </Box>
                ))}
                {type !== 'airbnb' ?
                    place?.cuisine?.map(({ key, name }) => (
                        <Chip key={key} size='small' label={name} className={classes.chip} />
                    )) :
                    <>
                        {place?.listingObjType && (<Chip size='small' label={place.listingObjType} className={classes.chip} />)}
                        {place?.roomType && (<Chip size='small' label={place.roomType} className={classes.chip} />)}
                        {place?.listingGuestLabel && (<Chip size='small' label={place.listingGuestLabel} className={classes.chip} />)}
                        {place?.listingBedLabel && (<Chip size='small' label={place.listingBedLabel} className={classes.chip} />)}
                        {place?.listingBathroomLabel && (<Chip size='small' label={place.listingBathroomLabel} className={classes.chip} />)}

                    </>
                }
                {type === 'airbnb' ?
                    place?.publicAddress && (<Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
                        <LocationOnIcon /> {place.publicAddress}
                    </Typography>) :
                    place?.address && (<Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
                        <LocationOnIcon /> {place.address}
                    </Typography>)}
                {type !== 'airbnb' && place?.phone && <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.spacing}>
                    <PhoneIcon /> {place.phone}
                </Typography>}
                {type === 'airbnb' &&
                    <Box display='flex' justifyContent='flex-end'>
                        {place?.verified?.badgeSecondaryText === 'Verified' ? <VerifiedIcon color='primary' fontSize='large' /> : <GppBadIcon fontSize='large' color='secondary' />}
                    </Box>}
            </CardContent>
            {type !== 'airbnb' && <CardActions>
                <Button size='small' color='primary' onClick={() => window.open(place.web_url, '_blank')}>
                    Trip Advisor
                </Button>
                <Button size='small' color='primary' onClick={() => window.open(place.website, '_blank')}>
                    Website
                </Button>
            </CardActions>}
        </Card>
    );
};

export default PlaceDetails;