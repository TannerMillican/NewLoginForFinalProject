import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Email from "./Email";

const useStyles = makeStyles((theme) => ({
	media: {
		height: 0,

		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
}));

const LandSCard = (props) => {
	const {avatarSrc, title, subtitle, description, imgsrc} = props;
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card>
			<CardHeader
				avatar={<Avatar src={avatarSrc} />}
				action={
					<IconButton aria-label="settings" aria-label="add to favorites">
						<ShareIcon />
						<FavoriteIcon />
					</IconButton>
				}
				action={<IconButton aria-label="settings">{<MoreVertIcon />}</IconButton>}
				title={title}
				subheader={subtitle}
			/>
			<CardMedia style={{height: '150px'}} image={imgsrc} />

			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{description}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites" color="secondary">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share" color="primary">
					<ShareIcon />
				</IconButton>
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded,
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>Focus:</Typography>
					<Typography paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, id?</Typography>
					<Typography paragraph>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis aut temporibus mollitia rem corporis nesciunt!</Typography>
					<Typography paragraph>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic deserunt nulla eveniet incidunt aliquam fugit vel praesentium. Repellat, repellendus sit?</Typography>
					<Typography>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, temporibus.</Typography>
					<Email />
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default LandSCard;
