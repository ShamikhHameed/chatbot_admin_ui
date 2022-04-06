// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import DragDrop from '../components/DragDrop';

// for the tokenizer radio
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

// for the featurizer checkboxes
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';

import './Pipeline.css'

// ----------------------------------------------------------------------

export default function DashboardApp() {
  // used to check whether to display a component or not
  const [tokenizerValue, setTokenizerValue] = React.useState("WhitespaceTokenizer");
  const [featurizerValues, setFeaturizerValues] = React.useState({
    mitieF: true,
    spacyF: false,
    convertF: false,
    languageModelF: false,
    regexF: false,
    countVectorsF: false,
    lexicalSyntacticF: false,
  });
  const [classifierValues, setClassifierValues] = React.useState({
    mitieC: true,
    skLearnC: false,
    keywordC: false,
    dietC: false,
    fallbackC: false,
  });
  const [extractorValues, setExtractorValues] = React.useState({
    mitieE: true,
    spacyE: false,
    crfE: false,
    ducklingE: false,
    regexE: false,
    entityE: false,
  });

  // TOKENIZERS - State
  // select options state for WhitespaceTokenizer
  const [whitespaceTokenizerFlag, setWhitespaceTokenizerFlag] = React.useState(false);
  const [whitespaceTokenizerSplitSymbol, setWhitespaceTokenizerSplitSymbol] = React.useState("_");
  const [whitespaceTokenizerTokenPattern, setWhitespaceTokenizerTokenPattern] = React.useState(" ");

  // select options state for JiebaTokenizer
  // need to initialise dictionary path state
  const [jiebaTokenizerFlag, setJiebaTokenizerFlag] = React.useState(false);
  const [jiebaTokenizerSplitSymbol, setJiebaTokenizerSplitSymbol] = React.useState("_");
  const [jiebaTokenizerTokenPattern, setJiebaTokenizerTokenPattern] = React.useState(" ");
  
  // select options state for MitieTokenizer
  const [mitieTokenizerFlag, setMitieTokenizerFlag] = React.useState(false);
  const [mitieTokenizerSplitSymbol, setMitieTokenizerSplitSymbol] = React.useState("_");
  const [mitieTokenizerTokenPattern, setMitieTokenizerTokenPattern] = React.useState(" ");

  // select options state for SpacyTokenizer
  const [spacyTokenizerFlag, setSpacyTokenizerFlag] = React.useState(false);
  const [spacyTokenizerSplitSymbol, setSpacyTokenizerSplitSymbol] = React.useState("_");
  const [spacyTokenizerTokenPattern, setSpacyTokenizerTokenPattern] = React.useState(" ");

  // FEATURIZERS - State
  // select options state for MitieFeaturizer
  const [mitieFeaturizerPooling, setMitieFeaturizerPooling] = React.useState("mean");

  // select options state for SpacyFeaturizer
  const [spacyFeaturizerPooling, setSpacyFeaturizerPooling] = React.useState("mean");

  // select options state for ConveRTFeaturizer
  // implement model url

  // select options state for LanguageModelFeaturizer
  const [languageModelFeaturizerModelName, setLanguageModelFeaturizerModelName] = React.useState("bert");
  const [languageModelFeaturizerModelWeight, setLanguageModelFeaturizerModelWeight] = React.useState("rasa/LaBSE");

  // used to handle change on whether to display a component or not
  const handleTokenizerChange = (event) => {
    setTokenizerValue(event.target.value);
  };

  const handleFeaturizerChange = (event) => {
    setFeaturizerValues({
      ...featurizerValues,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClassifierChange = (event) => {
    setClassifierValues({
      ...classifierValues,
      [event.target.name]: event.target.checked,
    });
  };

  const handleExtractorChange = (event) => {
    setExtractorValues({
      ...extractorValues,
      [event.target.name]: event.target.checked,
    });
  };

  // TOKENIZERS - handleChange
  // handle chnage for WhitespaceTokenizers
  const handleWhitespaceTokenizerFlagChange = (event) => {
    setWhitespaceTokenizerFlag(event.target.value);
  }

  const handleWhitespaceTokenizerSplitSymbolChange = (event) => {
    setWhitespaceTokenizerSplitSymbol(event.target.value);
  }

  const handleWhitespaceTokenizerTokenPatternChange = (event) => {
    setWhitespaceTokenizerTokenPattern(event.target.value);
  }

  // handle chnage for JiebaTokenizers
  // need to implement handleChange for dictionary path
  const handleJiebaTokenizerFlagChange = (event) => {
    setJiebaTokenizerFlag(event.target.value);
  }

  const handleJiebaTokenizerSplitSymbolChange = (event) => {
    setJiebaTokenizerSplitSymbol(event.target.value);
  }

  const handleJiebaTokenizerTokenPatternChange = (event) => {
    setJiebaTokenizerTokenPattern(event.target.value);
  }

  // handle chnage for MitieTokenizers
  const handleMitieTokenizerFlagChange = (event) => {
    setMitieTokenizerFlag(event.target.value);
  }

  const handleMitieTokenizerSplitSymbolChange = (event) => {
    setMitieTokenizerSplitSymbol(event.target.value);
  }

  const handleMitieTokenizerTokenPatternChange = (event) => {
    setMitieTokenizerTokenPattern(event.target.value);
  }

  // handle chnage for SpacyTokenizers
  const handleSpacyTokenizerFlagChange = (event) => {
    setSpacyTokenizerFlag(event.target.value);
  }

  const handleSpacyTokenizerSplitSymbolChange = (event) => {
    setSpacyTokenizerSplitSymbol(event.target.value);
  }

  const handleSpacyTokenizerTokenPatternChange = (event) => {
    setSpacyTokenizerTokenPattern(event.target.value);
  }

  // FEATURIZERS - handleChange
  // handle chnage for MitieFeaturizer
  const handleMitieFeaturizerPoolingChange = (event) => {
    setMitieFeaturizerPooling(event.target.value);
  }

  // handle chnage for SpacyFeaturizer
  const handleSpacyFeaturizerPoolingChange = (event) => {
    setSpacyFeaturizerPooling(event.target.value);
  }

  // handle chnage for ConveRTFeaturizer
  // need to implement handleChange for model url

  // handle chnage for languageModelFeaturizer
  const handleLanguageModelFeaturizerModelNameChange = async (event) => {
    await setLanguageModelFeaturizerModelName(event.target.value);
  }

  const handleLanguageModelFeaturizerModelWeightChange = (event) => {
    setLanguageModelFeaturizerModelWeight(event.target.value);
  }


  const { mitieF, spacyF, convertF, languageModelF, regexF, countVectorsF, lexicalSyntacticF } = featurizerValues;
  const featurizerError = [mitieF, spacyF, convertF, languageModelF, regexF, countVectorsF, lexicalSyntacticF].filter((v) => v).length === 0;
  
  const { mitieC, skLearnC, keywordC, dietC, fallbackC } = classifierValues;
  const classifierError = [mitieC, skLearnC, keywordC, dietC, fallbackC].filter((v) => v).length === 0;

  const { mitieE, spacyE, crfE, ducklingE, regexE, entityE } = extractorValues;
  const extractorError = [mitieE, spacyE, crfE, ducklingE, regexE, entityE].filter((v) => v).length === 0;

  // arrays for languageModelFeaturizer models
  // const modelName = ["bert", "gpt", "gpt2", "xlnet", "distilbert", "roberta"];
  const bertModelWeight = ["rasa/LaBSE"];
  const gptModelWeight = ["openai-gpt"];
  const gpt2ModelWeight = ["gpt2"];
  const xlnetModelWeight = ["xlnet-base-cased"];
  const distilbertModelWeight = ["distilbert-base-uncased"];
  const robertaModelWeight = ["roberta-base"];

  let languageModelFeaturizerModelNameType = bertModelWeight;
  let languageModelFeaturizerModelWeightOptions = bertModelWeight.map((val) => <MenuItem value={val}>{val}</MenuItem>);

  if (languageModelFeaturizerModelName === "bert"){
    languageModelFeaturizerModelNameType = bertModelWeight;
  } else if (languageModelFeaturizerModelName === "gpt"){
    languageModelFeaturizerModelNameType = gptModelWeight;
  } else if (languageModelFeaturizerModelName === "gpt2"){
    languageModelFeaturizerModelNameType = gpt2ModelWeight;
  } else if (languageModelFeaturizerModelName === "xlnet"){
    languageModelFeaturizerModelNameType = xlnetModelWeight;
  } else if (languageModelFeaturizerModelName === "distilbert"){
    languageModelFeaturizerModelNameType = distilbertModelWeight;
  } else if (languageModelFeaturizerModelName === "roberta"){
    languageModelFeaturizerModelNameType = robertaModelWeight;
  }

  if (languageModelFeaturizerModelNameType){
    languageModelFeaturizerModelWeightOptions = languageModelFeaturizerModelNameType.map((val) => <MenuItem value={val}>{val}</MenuItem>);
  }

  return (
    <Page title="Pipeline | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Configure your own pipeline right here!</Typography>
        </Box>
        {/* <DndProvider backend={HTML5Backend}>
          <div>
            <DragDrop />
          </div>
        </DndProvider> */}
        <div style={{height: "100vh", width: "100vw"}}>
            <div style={{height: "100vh", width: "16vw", float: "left"}}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">Tokenizers</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={tokenizerValue}
                onChange={handleTokenizerChange}
              >
                <FormControlLabel value="WhitespaceTokenizer" control={<Radio />} label="WhitespaceTokenizer" />
                <FormControlLabel value="JiebaTokenizer" control={<Radio />} label="JiebaTokenizer" />
                <FormControlLabel value="MitieTokenizer" control={<Radio />} label="MitieTokenizer" />
                <FormControlLabel value="SpacyTokenizer" control={<Radio />} label="SpacyTokenizer" />
              </RadioGroup>
            </FormControl>
            <br/><br/>

            <FormControl
              required
              error={featurizerError}
              component="fieldset"
              // sx={{ m: 3 }}
              variant="standard"
            >
              <FormLabel component="legend">Featurizers</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={mitieF} onChange={handleFeaturizerChange} name="mitieF" />
                  }
                  label="MitieFeaturizer"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={spacyF} onChange={handleFeaturizerChange} name="spacyF" />
                  }
                  label="SpacyFeaturizer"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={convertF} onChange={handleFeaturizerChange} name="convertF" />
                  }
                  label="ConveRTFeaturizer"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={languageModelF} onChange={handleFeaturizerChange} name="languageModelF" />
                  }
                  label="LanguageModelFeaturizer"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={regexF} onChange={handleFeaturizerChange} name="regexF" />
                  }
                  label="RegexFeaturizer"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={countVectorsF} onChange={handleFeaturizerChange} name="countVectorsF" />
                  }
                  label="CountVectorsFeaturizer"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={lexicalSyntacticF} onChange={handleFeaturizerChange} name="lexicalSyntacticF" />
                  }
                  label="LexicalSyntacticFeaturizer"
                />
              </FormGroup>
              <FormHelperText>Choose atleast one Featurizer</FormHelperText>
            </FormControl>
            <br/><br/>

            <FormControl
              required
              error={classifierError}
              component="fieldset"
              // sx={{ m: 3 }}
              variant="standard"
            >
              <FormLabel component="legend">Classifiers</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={mitieC} onChange={handleClassifierChange} name="mitieC" />
                  }
                  label="MitieIntentClassifier"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={skLearnC} onChange={handleClassifierChange} name="skLearnC" />
                  }
                  label="SklearnIntentClassifier"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={keywordC} onChange={handleClassifierChange} name="keywordC" />
                  }
                  label="KeywordIntentClassifier"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={dietC} onChange={handleClassifierChange} name="dietC" />
                  }
                  label="DIETClassifier"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={fallbackC} onChange={handleClassifierChange} name="fallbackC" />
                  }
                  label="FallbackClassifier"
                />
              </FormGroup>
              <FormHelperText>Choose atleast one Classifier</FormHelperText>
            </FormControl>
            <br/><br/>

            <FormControl
              required
              error={extractorError}
              component="fieldset"
              // sx={{ m: 3 }}
              variant="standard"
            >
              <FormLabel component="legend">Extractors</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={mitieE} onChange={handleExtractorChange} name="mitieE" />
                  }
                  label="MitieEntityExtractor"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={spacyE} onChange={handleExtractorChange} name="spacyE" />
                  }
                  label="SpacyEntityExtractor"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={crfE} onChange={handleExtractorChange} name="crfE" />
                  }
                  label="CRFEntityExtractor"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={ducklingE} onChange={handleExtractorChange} name="ducklingE" />
                  }
                  label="DucklingEntityExtractor"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={regexE} onChange={handleExtractorChange} name="regexE" />
                  }
                  label="RegexEntityExtractor"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={entityE} onChange={handleExtractorChange} name="entityE" />
                  }
                  label="EntitySynonymMapper"
                />
              </FormGroup>
              <FormHelperText>Choose atleast one Extractor</FormHelperText>
            </FormControl>
            </div>
            <div style={{height: "100vh", width: "84vw", float: "right"}}>
              {tokenizerValue === "WhitespaceTokenizer" && 
              <div className='PipelineComponent'>
                WhitespaceTokenizer
                <br/><br/>
                
                <TextField
                  value={whitespaceTokenizerFlag}
                  onChange={handleWhitespaceTokenizerFlagChange}
                  select // tell TextField to render select
                  label="Intent Tokenization Flag"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value={false}>False</MenuItem>
                  <MenuItem value>True</MenuItem>
                </TextField>

                <TextField
                  value={whitespaceTokenizerSplitSymbol}
                  onChange={handleWhitespaceTokenizerSplitSymbolChange}
                  select // tell TextField to render select
                  label="Intent Split Symbol"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value="_">_</MenuItem>
                </TextField>
                
                <TextField
                  value={whitespaceTokenizerTokenPattern}
                  onChange={handleWhitespaceTokenizerTokenPatternChange}
                  select // tell TextField to render select
                  label="Token Pattern"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value=" ">None</MenuItem>
                </TextField>
              </div>}
              {tokenizerValue === "JiebaTokenizer" && 
              <div className='PipelineComponent'>
                JiebaTokenizer
                <br/><br/>
                **implement dictionary path here
                <br/><br/>
                
                <TextField
                  value={jiebaTokenizerFlag}
                  onChange={handleJiebaTokenizerFlagChange}
                  select // tell TextField to render select
                  label="Intent Tokenization Flag"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value={false}>False</MenuItem>
                  <MenuItem value>True</MenuItem>
                </TextField>

                <TextField
                  value={jiebaTokenizerSplitSymbol}
                  onChange={handleJiebaTokenizerSplitSymbolChange}
                  select // tell TextField to render select
                  label="Intent Split Symbol"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value="_">_</MenuItem>
                </TextField>
                
                <TextField
                  value={jiebaTokenizerTokenPattern}
                  onChange={handleJiebaTokenizerTokenPatternChange}
                  select // tell TextField to render select
                  label="Token Pattern"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value=" ">None</MenuItem>
                </TextField>
              </div>}
              {tokenizerValue === "MitieTokenizer" && 
              <div className='PipelineComponent'>
                MitieTokenizer
                <br/><br/>
                
                <TextField
                  value={mitieTokenizerFlag}
                  onChange={handleMitieTokenizerFlagChange}
                  select // tell TextField to render select
                  label="Intent Tokenization Flag"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value={false}>False</MenuItem>
                  <MenuItem value>True</MenuItem>
                </TextField>

                <TextField
                  value={mitieTokenizerSplitSymbol}
                  onChange={handleMitieTokenizerSplitSymbolChange}
                  select // tell TextField to render select
                  label="Intent Split Symbol"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value="_">_</MenuItem>
                </TextField>
                
                <TextField
                  value={mitieTokenizerTokenPattern}
                  onChange={handleMitieTokenizerTokenPatternChange}
                  select // tell TextField to render select
                  label="Token Pattern"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value=" ">None</MenuItem>
                </TextField>
              </div>}
              {tokenizerValue === "SpacyTokenizer" && 
              <div className='PipelineComponent'>
                SpacyTokenizer
                <br/><br/>
                
                <TextField
                  value={spacyTokenizerFlag}
                  onChange={handleSpacyTokenizerFlagChange}
                  select // tell TextField to render select
                  label="Intent Tokenization Flag"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value={false}>False</MenuItem>
                  <MenuItem value>True</MenuItem>
                </TextField>

                <TextField
                  value={spacyTokenizerSplitSymbol}
                  onChange={handleSpacyTokenizerSplitSymbolChange}
                  select // tell TextField to render select
                  label="Intent Split Symbol"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value="_">_</MenuItem>
                </TextField>
                
                <TextField
                  value={spacyTokenizerTokenPattern}
                  onChange={handleSpacyTokenizerTokenPatternChange}
                  select // tell TextField to render select
                  label="Token Pattern"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value=" ">None</MenuItem>
                </TextField>
              </div>}

              {mitieF && 
              <div className='PipelineComponent'>
                MitieFeaturizer
                <br/><br/>
                
                <TextField
                  value={mitieFeaturizerPooling}
                  onChange={handleMitieFeaturizerPoolingChange}
                  select // tell TextField to render select
                  label="Pooling"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value="mean">Mean</MenuItem>
                  <MenuItem value="max">Max</MenuItem>
                </TextField>
              </div>}
              {spacyF && 
              <div className='PipelineComponent'>
                SpacyFeaturizer
                <br/><br/>
                
                <TextField
                  value={spacyFeaturizerPooling}
                  onChange={handleSpacyFeaturizerPoolingChange}
                  select // tell TextField to render select
                  label="Pooling"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value="mean">Mean</MenuItem>
                  <MenuItem value="max">Max</MenuItem>
                </TextField>
              </div>}
              {convertF && 
              <div className='PipelineComponent'>
                ConveRTFeaturizer
              </div>}
              {languageModelF && 
              <div className='PipelineComponent'>
                LanguageModelFeaturizer
                <br/><br/>
                
                <TextField
                  value={languageModelFeaturizerModelName}
                  onChange={handleLanguageModelFeaturizerModelNameChange}
                  select // tell TextField to render select
                  label="Language Model"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value="bert">BERT</MenuItem>
                  <MenuItem value="gpt">GPT</MenuItem>
                  <MenuItem value="gpt2">GPT2</MenuItem>
                  <MenuItem value="xlnet">XLNet</MenuItem>
                  <MenuItem value="distilbert">DistilBERT</MenuItem>
                  <MenuItem value="roberta">RoBERTa</MenuItem>
                </TextField>

                <TextField
                  value={languageModelFeaturizerModelWeight}
                  onChange={handleLanguageModelFeaturizerModelWeightChange}
                  select // tell TextField to render select
                  label="Language Model Weight"
                  className="TokenizerDropDowns"
                >
                  {
                    languageModelFeaturizerModelWeightOptions
                  }
                </TextField>
              </div>}
              {regexF && <div className='PipelineComponent'>RegexFeaturizer</div>}
              {countVectorsF && <div className='PipelineComponent'>CountVectorsFeaturizer</div>}
              {lexicalSyntacticF && <div className='PipelineComponent'>LexicalSyntacticFeaturizer</div>}

              {mitieC && <div>MitieIntentClassifier</div>}
              {skLearnC && <div>SklearnIntentClassifier</div>}
              {keywordC && <div>KeywordIntentClassifier</div>}
              {dietC && <div>DIETClassifier</div>}
              {fallbackC && <div>FallbackClassifier</div>}

              {mitieE && <div>MitieEntityExtractor</div>}
              {spacyE && <div>SpacyEntityExtractor</div>}
              {crfE && <div>CRFEntityExtractor</div>}
              {ducklingE && <div>DucklingEntityExtractor</div>}
              {regexE && <div>RegexEntityExtractor</div>}
              {entityE && <div>EntitySynonymMapper</div>}
            </div>
          </div>
          <div style={{clear: "both"}}/>
        {/* <Box style={{height: "1000px", width: "300px", backgroundColor: "red"}}> */}
        
        {/* </Box> */}
      </Container>
    </Page>
  );
}
