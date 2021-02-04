import React, {useState} from "react";
import {Input, DialogContent, Select, MenuItem, InputLabel, FormControl, Slider} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    slider: {
        width: 300,
        height: 10,
        display:"flex",
        justifyContent:"center"
    },
}));

function MainContent({setFormData, formData, count, currentData}) {
    const [personIndustry, setPersonIndustry] = useState('Select Industry');
    const classes = useStyles();

    const onChange = ({id, value}) => {
        formData[count][id].value = value
        setFormData({...formData})
    };

    const handleChange = (id,value) => {
        setPersonIndustry(value);
        onChange({id, value })
    };
    const handleSlider = (id,e) => {
        onChange({id, value:e.target.ariaValueNow})
    };



    return (
        <DialogContent>
            {
                Object.keys(currentData).map((key) => {
                    if (key === 'pageNumber') return null;
                    return (
                        <div>
                            {currentData[key].name} :
                            <span style={{marginLeft: "10px"}}>
                                {
                                    currentData[key].name === 'Industry' ?
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id={key + 'label'}>Select
                                                Industry</InputLabel>
                                            <Select
                                                labelId={key + 'label'}
                                                id={key}
                                                value={personIndustry}
                                                onChange={(e) => handleChange(key,e.target.value)}
                                                input={<Input/>}
                                                MenuProps={MenuProps}
                                            >
                                                {currentData[key].selectValues.map((name) => (
                                                    <MenuItem key={name} value={name}>
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        : (
                                            currentData[key].name === 'Debt Amount' ?
                                                <Slider
                                                    className={classes.slider}
                                                    defaultValue={currentData[key].range.min+1000}
                                                    onMouseUp={(e) => handleSlider(key,e)}
                                                    aria-labelledby="discrete-slider-small-steps"
                                                    step={100}
                                                    min={currentData[key].range.min}
                                                    max={currentData[key].range.max}
                                                    valueLabelDisplay="auto"
                                                />
                                                :

                                                <Input
                                                    autoFocus
                                                    required
                                                    id={key}
                                                    value={currentData[key].value}
                                                    type={currentData[key].type}
                                                    onChange={(e) => onChange(e.target)}
                                                />
                                        )
                                }
                            </span>
                        </div>
                    )
                })
            }

        </DialogContent>

    )
}

export default MainContent
