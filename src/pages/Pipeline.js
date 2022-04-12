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
    logisticC: false,
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

  const regexFeaturizerMinNumOfPatterns = 10;

  const countVectorsFeaturizerMinNGramValue = 1;
  const countVectorsFeaturizerMaxNGramValue = 1;

  const countVectorsFeaturizerMinTextSize = 1000;
  const countVectorsFeaturizerMinResponseSize = 1000;
  const countVectorsFeaturizerMinActionTextSize = 1000;

  const logisticRegressionClassifierMaxIterValue = 1;

  const logisticRegressionClassifierMinRandomState = 1;

  const sklearnIntentClassifierMinC = 1;
  const sklearnIntentClassifierMinMaxFolds = 1;

  const DIETClassifierMinEpochs = 1;

  const fallbackClassifierMinThreshold = 0.1;
  const fallbackClassifierMaxThreshold = 1.0;

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
  // THIS NEEDS TO BE NULL NOT A STRING
  const [languageModelFeaturizerCacheDir, setLanguageModelFeaturizerCacheDir] = React.useState('null');

  // select options state for RegexFeaturizer
  const [regexFeaturizerCaseSensitive, setRegexFeaturizerCaseSensitive] = React.useState(true);
  const [regexFeaturizerWordBoundaries, setRegexFeaturizerWordBoundaries] = React.useState(true);
  const [regexFeaturizerNumOfPatterns, setRegexFeaturizerNumOfPatterns] = React.useState(10);
  const [regexFeaturizerHidePatternsTextField, setRegexFeaturizerHidePatternsTextField] = React.useState(false);

  // select options state for CountVectorsFeaturizer
  const [countVectorsFeaturizerAnalyzer, setCountVectorsFeaturizerAnalyzer] = React.useState("word");
  const [countVectorsFeaturizerMinNGram, setCountVectorsFeaturizerMinNGram] = React.useState(1);
  const [countVectorsFeaturizerMaxNGram, setCountVectorsFeaturizerMaxNGram] = React.useState(1);
  const [countVectorsFeaturizerOOVToken, setCountVectorsFeaturizerOOVToken] = React.useState("None");
  const [countVectorsFeaturizerSharedVocab, setCountVectorsFeaturizerSharedVocab] = React.useState(false);
  const [countVectorsFeaturizerTextSize, setCountVectorsFeaturizerTextSize] = React.useState(1000);
  const [countVectorsFeaturizerResponseSize, setCountVectorsFeaturizerResponseSize] = React.useState(1000);
  const [countVectorsFeaturizerActionTextSize, setCountVectorsFeaturizerActionTextSize] = React.useState(1000);

  // select options state for LexicalSyntacticFeaturizer
  const [lexicalSyntacticFeaturizerBefore, setLexicalSyntacticFeaturizerBefore] = React.useState({
    beforeBOS: false,
    beforeEOS: false,
    beforeLow: true,
    beforeUpper: true,
    beforeTitle: true,
    beforeDigit: false,
    beforePrefix5: false,
    beforePrefix2: false,
    beforeSuffix5: false,
    beforeSuffix3: false,
    beforeSuffix2: false,
    beforeSuffix1: false,
    // using below 2 requires SpacyTokenizer
    beforePos: false,
    beforePos2: false,
  });

  const [lexicalSyntacticFeaturizerToken, setLexicalSyntacticFeaturizerToken] = React.useState({
    tokenBOS: true,
    tokenEOS: true,
    tokenLow: true,
    tokenUpper: true,
    tokenTitle: true,
    tokenDigit: true,
    tokenPrefix5: false,
    tokenPrefix2: false,
    tokenSuffix5: false,
    tokenSuffix3: false,
    tokenSuffix2: false,
    tokenSuffix1: false,
    // using below 2 requires SpacyTokenizer
    tokenPos: false,
    tokenPos2: false,
  });

  const [lexicalSyntacticFeaturizerAfter, setLexicalSyntacticFeaturizerAfter] = React.useState({
    afterBOS: false,
    afterEOS: false,
    afterLow: true,
    afterUpper: true,
    afterTitle: true,
    afterDigit: false,
    afterPrefix5: false,
    afterPrefix2: false,
    afterSuffix5: false,
    afterSuffix3: false,
    afterSuffix2: false,
    afterSuffix1: false,
    // using below 2 requires SpacyTokenizer
    afterPos: false,
    afterPos2: false,
  });

  // select options state for LogisticRegressionClassifier
  const [logisticRegressionClassifierMaxIter, setLogisticRegressionClassifierMaxIter] = React.useState(1);
  const [logisticRegressionClassifierSolver, setLogisticRegressionClassifierSolver] = React.useState("lbfgs");
  const [logisticRegressionClassifierTol, setLogisticRegressionClassifierTol] = React.useState(0.0001);
  const [logisticRegressionClassifierRandomState, setLogisticRegressionClassifierRandomState] = React.useState(1);
  const [logisticRegressionClassifierHideTextField, setLogisticRegressionClassifierHideTextField] = React.useState(false);

  // select options state for SklearnIntentClassifier
  const [sklearnIntentClassifierC1, setSklearnIntentClassifierC1] = React.useState(1);
  const [sklearnIntentClassifierC2, setSklearnIntentClassifierC2] = React.useState(2);
  const [sklearnIntentClassifierC3, setSklearnIntentClassifierC3] = React.useState(5);
  const [sklearnIntentClassifierC4, setSklearnIntentClassifierC4] = React.useState(10);
  const [sklearnIntentClassifierC5, setSklearnIntentClassifierC5] = React.useState(20);
  const [sklearnIntentClassifierC6, setSklearnIntentClassifierC6] = React.useState(100);
  const [sklearnIntentClassifierKernels, setSklearnIntentClassifierKernels] = React.useState("linear");
  const [sklearnIntentClassifierGamma, setSklearnIntentClassifierGamma] = React.useState(0.1);
  const [sklearnIntentClassifierMaxFolds, setSklearnIntentClassifierMaxFolds] = React.useState(5);
  const [sklearnIntentClassifierScoringFunc, setSklearnIntentClassifierScoringFunc] = React.useState("f1_weighted");

  // select options state for KeywordIntentClassifier
  const [keywordIntentClassifierCaseSensitive, setKeywordIntentClassifierCaseSensitive] = React.useState(true);

  // select options state for DIETClassifier
  const [DIETClassifierEpochs, setDIETClassifierEpochs] = React.useState(300);
  const [DIETClassifierEntityRecognition, setDIETClassifierEntityRecognition] = React.useState(true);
  const [DIETClassifierIntentClassification, setDIETClassifierIntentClassification] = React.useState(true);

  // select options state for FallbackClassifier
  const [fallbackClassifierThreshold, setFallbackClassifierThreshold] = React.useState(0.7);

  // select options state for SpacyEntityExtractor
  const [spacyEntityExtractorDimensions, setSpacyEntityExtractorDimensions] = React.useState({
    person: false,
    loc: true,
    org: false,
    product: false
  });


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
  const handleLanguageModelFeaturizerModelNameChange = (event) => {
    setLanguageModelFeaturizerModelName(event.target.value);
  }

  const handleLanguageModelFeaturizerModelWeightChange = (event) => {
    setLanguageModelFeaturizerModelWeight(event.target.value);
  }

  const handleLanguageModelFeaturizerCacheDirChange = (event) => {
    setLanguageModelFeaturizerCacheDir(event.target.value);
  }

  // handle chnage for RegexFeaturizer
  const handleRegexFeaturizerCaseSensitiveChange = (event) => {
    setRegexFeaturizerCaseSensitive(event.target.value);
  }

  const handleRegexFeaturizerWordBoundariesChange = (event) => {
    setRegexFeaturizerWordBoundaries(event.target.value);
  }

  const handleRegexFeaturizerNumOfPatternsChange = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value < regexFeaturizerMinNumOfPatterns) value = regexFeaturizerMinNumOfPatterns;

    setRegexFeaturizerNumOfPatterns(value);
  }

  const handleRegexFeaturizerHidePatternsTextFieldChange = (event) => {
    setRegexFeaturizerHidePatternsTextField(event.target.checked);
  }

  // handle chnage for CountVectorsFeaturizer
  const handleCountVectorsFeaturizerAnalyzerChange = (event) => {
    setCountVectorsFeaturizerAnalyzer(event.target.value);
  }

  const handleCountVectorsFeaturizerMinNGramChange = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value < countVectorsFeaturizerMinNGramValue) value = countVectorsFeaturizerMinNGramValue;

    setCountVectorsFeaturizerMinNGram(value);
  }

  const handleCountVectorsFeaturizerMaxNGramChange = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value < countVectorsFeaturizerMaxNGramValue) value = countVectorsFeaturizerMaxNGramValue;

    setCountVectorsFeaturizerMaxNGram(value);
  }

  const handleCountVectorsFeaturizerOOVTokenChange = (event) => {
    setCountVectorsFeaturizerOOVToken(event.target.value);
  }

  const handleCountVectorsFeaturizerSharedVocabChange = (event) => {
    setCountVectorsFeaturizerSharedVocab(event.target.value);
  }

  const handleCountVectorsFeaturizerTextSizeChange = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value < countVectorsFeaturizerMinTextSize) value = countVectorsFeaturizerMinTextSize;

    setCountVectorsFeaturizerTextSize(value);
  }

  const handleCountVectorsFeaturizerResponseSizeChange = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value < countVectorsFeaturizerMinResponseSize) value = countVectorsFeaturizerMinResponseSize;

    setCountVectorsFeaturizerResponseSize(value);
  }

  const handleCountVectorsFeaturizerActionTextSizeChange = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value < countVectorsFeaturizerMinActionTextSize) value = countVectorsFeaturizerMinActionTextSize;

    setCountVectorsFeaturizerActionTextSize(value);
  }

  // handle chnage for LexicalSyntacticFeaturizer
  const handleLexicalSyntacticFeaturizerBeforeChange = (event) => {
    setLexicalSyntacticFeaturizerBefore({
      ...lexicalSyntacticFeaturizerBefore,
      [event.target.name]: event.target.checked,
    });
  };

  const handleLexicalSyntacticFeaturizerTokenChange = (event) => {
    setLexicalSyntacticFeaturizerToken({
      ...lexicalSyntacticFeaturizerToken,
      [event.target.name]: event.target.checked,
    });
  };

  const handleLexicalSyntacticFeaturizerAfterChange = (event) => {
    setLexicalSyntacticFeaturizerAfter({
      ...lexicalSyntacticFeaturizerAfter,
      [event.target.name]: event.target.checked,
    });
  };

  // handle chnage for LogisticRegressionClassifier
  const handleLogisticRegressionClassifierMaxIterChange = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value < logisticRegressionClassifierMaxIterValue) value = logisticRegressionClassifierMaxIterValue;

    setLogisticRegressionClassifierMaxIter(value);
  }

  const handleLogisticRegressionClassifierSolverChange = (event) => {
    setLogisticRegressionClassifierSolver(event.target.value);
  }

  const handleLogisticRegressionClassifierTolChange = (event) => {
    setLogisticRegressionClassifierTol(event.target.value);
  }

  const handleLogisticRegressionClassifierRandomStateChange = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value < logisticRegressionClassifierMinRandomState) value = logisticRegressionClassifierMinRandomState;

    setLogisticRegressionClassifierRandomState(value);
  }

  const handleLogisticRegressionClassifierHideTextFieldChange = (event) => {
    setLogisticRegressionClassifierHideTextField(event.target.checked);
  }

  // handle chnage for SklearnIntentClassifier
  const handleSklearnIntentClassifierC1Change = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value < sklearnIntentClassifierMinC) value = sklearnIntentClassifierMinC;

    setSklearnIntentClassifierC1(value);
  }

  const handleSklearnIntentClassifierC2Change = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value < sklearnIntentClassifierMinC) value = sklearnIntentClassifierMinC;

    setSklearnIntentClassifierC2(value);
  }

  const handleSklearnIntentClassifierC3Change = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value < sklearnIntentClassifierMinC) value = sklearnIntentClassifierMinC;

    setSklearnIntentClassifierC3(value);
  }

  const handleSklearnIntentClassifierC4Change = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value < sklearnIntentClassifierMinC) value = sklearnIntentClassifierMinC;

    setSklearnIntentClassifierC4(value);
  }

  const handleSklearnIntentClassifierC5Change = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value < sklearnIntentClassifierMinC) value = sklearnIntentClassifierMinC;

    setSklearnIntentClassifierC5(value);
  }

  const handleSklearnIntentClassifierC6Change = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value < sklearnIntentClassifierMinC) value = sklearnIntentClassifierMinC;

    setSklearnIntentClassifierC6(value);
  }

  const handleSklearnIntentClassifierKernelsChange = (event) => {
    setSklearnIntentClassifierKernels(event.target.value);
  }

  const handleSklearnIntentClassifierGammaChange = (event) => {
    setSklearnIntentClassifierGamma(event.target.value);
  }

  const handleSklearnIntentClassifierMaxFoldsChange = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value < sklearnIntentClassifierMinMaxFolds) value = sklearnIntentClassifierMinMaxFolds;

    setSklearnIntentClassifierMaxFolds(value);
  }

  const handleSklearnIntentClassifierScoringFuncChange = (event) => {
    setSklearnIntentClassifierScoringFunc(event.target.value);
  }

  // handle chnage for KeywordIntentClassifier
  const handleKeywordIntentClassifierCaseSensitiveChange = (event) => {
    setKeywordIntentClassifierCaseSensitive(event.target.value);
  }

  // handle chnage for DIETClassifier
  const handleDIETClassifierEpochsChange = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value < DIETClassifierMinEpochs) value = DIETClassifierMinEpochs;

    setDIETClassifierEpochs(value);
  }

  const handleDIETClassifierEntityRecognitionChange = (event) => {
    setDIETClassifierEntityRecognition(event.target.value);
  }

  const handleDIETClassifierIntentClassificationChange = (event) => {
    setDIETClassifierIntentClassification(event.target.value);
  }

  // handle chnage for FallbackClassifier
  const handleFallbackClassifierThresholdChange = (event) => {
    let value = parseFloat(event.target.value);

    if (value > fallbackClassifierMaxThreshold) value = fallbackClassifierMaxThreshold;
    if (value < fallbackClassifierMinThreshold) value = fallbackClassifierMinThreshold;

    setFallbackClassifierThreshold(value);
  }

  // handle chnage for SpacyEntityExtractor
  const handleSpacyEntityExtractorDimensionsChange = (event) => {
    setSpacyEntityExtractorDimensions({
      ...spacyEntityExtractorDimensions,
      [event.target.name]: event.target.checked,
    });
  };

  const { mitieF, spacyF, convertF, languageModelF, regexF, countVectorsF, lexicalSyntacticF } = featurizerValues;
  const featurizerError = [mitieF, spacyF, convertF, languageModelF, regexF, countVectorsF, lexicalSyntacticF].filter((v) => v).length === 0;
  
  const { mitieC, logisticC, skLearnC, keywordC, dietC, fallbackC } = classifierValues;
  const classifierError = [mitieC, logisticC, skLearnC, keywordC, dietC, fallbackC].filter((v) => v).length === 0;

  const { mitieE, spacyE, crfE, ducklingE, regexE, entityE } = extractorValues;
  const extractorError = [mitieE, spacyE, crfE, ducklingE, regexE, entityE].filter((v) => v).length === 0;


  // for LexicalSyntacticFeaturizer 
  const { beforeBOS, beforeEOS, beforeLow, beforeUpper, beforeTitle, beforeDigit, beforePrefix5, beforePrefix2, beforeSuffix5, beforeSuffix3, beforeSuffix2, beforeSuffix1, beforePos, beforePos2 } = lexicalSyntacticFeaturizerBefore;
  const lexicalSyntacticFeaturizerBeforeValuesError = [beforeBOS, beforeEOS, beforeLow, beforeUpper, beforeTitle, beforeDigit, beforePrefix5, beforePrefix2, beforeSuffix5, beforeSuffix3, beforeSuffix2, beforeSuffix1, beforePos, beforePos2].filter((v) => v).length === 0;

  const { tokenBOS, tokenEOS, tokenLow, tokenUpper, tokenTitle, tokenDigit, tokenPrefix5, tokenPrefix2, tokenSuffix5, tokenSuffix3, tokenSuffix2, tokenSuffix1, tokenPos, tokenPos2 } = lexicalSyntacticFeaturizerToken;
  const lexicalSyntacticFeaturizerTokenValuesError = [tokenBOS, tokenEOS, tokenLow, tokenUpper, tokenTitle, tokenDigit, tokenPrefix5, tokenPrefix2, tokenSuffix5, tokenSuffix3, tokenSuffix2, tokenSuffix1, tokenPos, tokenPos2].filter((v) => v).length === 0;

  const { afterBOS, afterEOS, afterLow, afterUpper, afterTitle, afterDigit, afterPrefix5, afterPrefix2, afterSuffix5, afterSuffix3, afterSuffix2, afterSuffix1, afterPos, afterPos2 } = lexicalSyntacticFeaturizerAfter;
  const lexicalSyntacticFeaturizerAfterValuesError = [afterBOS, afterEOS, afterLow, afterUpper, afterTitle, afterDigit, afterPrefix5, afterPrefix2, afterSuffix5, afterSuffix3, afterSuffix2, afterSuffix1, afterPos, afterPos2].filter((v) => v).length === 0;

  // for SpacyEntityExtractor
  const { person, loc, org, product } = spacyEntityExtractorDimensions;

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
                    <Checkbox checked={logisticC} onChange={handleClassifierChange} name="logisticC" />
                  }
                  label="LogisticRegressionClassifier"
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

                <br/><br/>
                
                <TextField
                  value={languageModelFeaturizerCacheDir}
                  onChange={handleLanguageModelFeaturizerCacheDirChange}
                  select // tell TextField to render select
                  label="Cache Directory"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value='null'>NULL</MenuItem>
                </TextField>
              </div>}
              {regexF && 
              <div className='PipelineComponent'>
                RegexFeaturizer
                <br/><br/>
                
                <TextField
                  value={regexFeaturizerCaseSensitive}
                  onChange={handleRegexFeaturizerCaseSensitiveChange}
                  select // tell TextField to render select
                  label="Case Sensitive"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value={false}>False</MenuItem>
                  <MenuItem value>True</MenuItem>
                </TextField>

                <TextField
                  value={regexFeaturizerWordBoundaries}
                  onChange={handleRegexFeaturizerWordBoundariesChange}
                  select // tell TextField to render select
                  label="Use Word Boundaries"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value={false}>False</MenuItem>
                  <MenuItem value>True</MenuItem>
                </TextField>

                <br/><br/>

                <Checkbox checked={regexFeaturizerHidePatternsTextField} onChange={handleRegexFeaturizerHidePatternsTextFieldChange} name="regexFeaturizerHidePatternsTextField" />

                <TextField
                  style={{width: "390px"}}
                  type="number"
                  inputProps={{ regexFeaturizerMinNumOfPatterns }}
                  value={regexFeaturizerNumOfPatterns}
                  onChange={handleRegexFeaturizerNumOfPatternsChange}
                  variant="outlined"
                  label="Number of Additional Patterns"
                  disabled={!regexFeaturizerHidePatternsTextField}
                />
              </div>}
              {countVectorsF && 
              <div className='PipelineComponent'>
                CountVectorsFeaturizer
                <br/><br/>
                
                <TextField
                  value={countVectorsFeaturizerAnalyzer}
                  onChange={handleCountVectorsFeaturizerAnalyzerChange}
                  select // tell TextField to render select
                  label="Analyzer"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value="word">word</MenuItem>
                  <MenuItem value="char">char</MenuItem>
                  <MenuItem value="char_wb">char_wb</MenuItem>
                </TextField>

                <br/><br/>

                <TextField
                  type="number"
                  inputProps={{ countVectorsFeaturizerMinNGramValue }}
                  value={countVectorsFeaturizerMinNGram}
                  onChange={handleCountVectorsFeaturizerMinNGramChange}
                  variant="outlined"
                  label="Min N-gram"
                  className="TokenizerDropDowns"
                />

                <TextField
                  type="number"
                  inputProps={{ countVectorsFeaturizerMaxNGramValue }}
                  value={countVectorsFeaturizerMaxNGram}
                  onChange={handleCountVectorsFeaturizerMaxNGramChange}
                  variant="outlined"
                  label="Max N-gram"
                  className="TokenizerDropDowns"
                />

                <br/><br/>
                
                <TextField
                  value={countVectorsFeaturizerOOVToken}
                  onChange={handleCountVectorsFeaturizerOOVTokenChange}
                  select // tell TextField to render select
                  label="OOV Token"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value="_oov_">_oov_</MenuItem>
                </TextField>

                <br/><br/>

                <TextField
                  value={countVectorsFeaturizerSharedVocab}
                  onChange={handleCountVectorsFeaturizerSharedVocabChange}
                  select // tell TextField to render select
                  label="Use Shared Vocab"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value={false}>False</MenuItem>
                  <MenuItem value>True</MenuItem>
                </TextField>

                <br/><br/>

                <TextField
                  type="number"
                  inputProps={{ countVectorsFeaturizerMinTextSize }}
                  value={countVectorsFeaturizerTextSize}
                  onChange={handleCountVectorsFeaturizerTextSizeChange}
                  variant="outlined"
                  label="Additional Vocabulary Text Size"
                  className="TokenizerDropDowns"
                />

                <TextField
                  type="number"
                  inputProps={{ countVectorsFeaturizerMinResponseSize }}
                  value={countVectorsFeaturizerResponseSize}
                  onChange={handleCountVectorsFeaturizerResponseSizeChange}
                  variant="outlined"
                  label="Additional Vocabulary Response Text Size"
                  className="TokenizerDropDowns"
                />

                <TextField
                  type="number"
                  inputProps={{ countVectorsFeaturizerMinActionTextSize }}
                  value={countVectorsFeaturizerActionTextSize}
                  onChange={handleCountVectorsFeaturizerActionTextSizeChange}
                  variant="outlined"
                  label="Additional Vocabulary Action Text Size"
                  className="TokenizerDropDowns"
                />
              </div>}
              {lexicalSyntacticF && 
              <div className='PipelineComponent'>
                LexicalSyntacticFeaturizer
                <br/><br/>

                <FormControl
                  required
                  error={lexicalSyntacticFeaturizerBeforeValuesError}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">Features for Before Token</FormLabel>
                  <FormGroup 
                    className="lexicalSyntacticFeaturizerFormGroup"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox checked={beforeBOS} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeBOS" />
                      }
                      label="BOS"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={beforeEOS} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeEOS" />
                      }
                      label="EOS"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={beforeLow} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeLow" />
                      }
                      label="low"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={beforeUpper} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeUpper" />
                      }
                      label="upper"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={beforeTitle} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeTitle" />
                      }
                      label="title"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={beforeDigit} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeDigit" />
                      }
                      label="digit"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={beforePrefix5} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforePrefix5" />
                      }
                      label="prefix5"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={beforePrefix2} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforePrefix2" />
                      }
                      label="prefix2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={beforeSuffix5} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeSuffix5" />
                      }
                      label="suffix5"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={beforeSuffix3} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeSuffix3" />
                      }
                      label="suffix3"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={beforeSuffix2} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeSuffix2" />
                      }
                      label="suffix2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={beforeSuffix1} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeSuffix1" />
                      }
                      label="suffix1"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={beforePos} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforePos" />
                      }
                      label="pos"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={beforePos2} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforePos2" />
                      }
                      label="pos2"
                    />
                  </FormGroup>
                  <FormHelperText>Choose atleast one Before Token Feature</FormHelperText>
                </FormControl>

                <br/><br/>

                <FormControl
                  required
                  error={lexicalSyntacticFeaturizerTokenValuesError}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">Features for Current Token</FormLabel>
                  <FormGroup 
                    className="lexicalSyntacticFeaturizerFormGroup"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenBOS} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenBOS" />
                      }
                      label="BOS"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenEOS} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenEOS" />
                      }
                      label="EOS"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenLow} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenLow" />
                      }
                      label="low"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenUpper} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenUpper" />
                      }
                      label="upper"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenTitle} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenTitle" />
                      }
                      label="title"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenDigit} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenDigit" />
                      }
                      label="digit"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenPrefix5} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenPrefix5" />
                      }
                      label="prefix5"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenPrefix2} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenPrefix2" />
                      }
                      label="prefix2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenSuffix5} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenSuffix5" />
                      }
                      label="suffix5"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenSuffix3} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenSuffix3" />
                      }
                      label="suffix3"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenSuffix2} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenSuffix2" />
                      }
                      label="suffix2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenSuffix1} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenSuffix1" />
                      }
                      label="suffix1"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenPos} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenPos" />
                      }
                      label="pos"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenPos2} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenPos2" />
                      }
                      label="pos2"
                    />
                  </FormGroup>
                  <FormHelperText>Choose atleast one Current Token Feature</FormHelperText>
                </FormControl>

                <br/><br/>

                <FormControl
                  required
                  error={lexicalSyntacticFeaturizerAfterValuesError}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">Features for After Token</FormLabel>
                  <FormGroup 
                    className="lexicalSyntacticFeaturizerFormGroup"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterBOS} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterBOS" />
                      }
                      label="BOS"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterEOS} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterEOS" />
                      }
                      label="EOS"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterLow} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterLow" />
                      }
                      label="low"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterUpper} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterUpper" />
                      }
                      label="upper"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterTitle} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterTitle" />
                      }
                      label="title"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterDigit} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterDigit" />
                      }
                      label="digit"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterPrefix5} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterPrefix5" />
                      }
                      label="prefix5"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterPrefix2} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterPrefix2" />
                      }
                      label="prefix2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterSuffix5} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterSuffix5" />
                      }
                      label="suffix5"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterSuffix3} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterSuffix3" />
                      }
                      label="suffix3"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterSuffix2} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterSuffix2" />
                      }
                      label="suffix2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterSuffix1} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterSuffix1" />
                      }
                      label="suffix1"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterPos} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterPos" />
                      }
                      label="pos"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterPos2} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterPos2" />
                      }
                      label="pos2"
                    />
                  </FormGroup>
                  <FormHelperText>Choose atleast one After Token Feature</FormHelperText>
                </FormControl>
              </div>}

              {mitieC && <div className='PipelineComponent'>MitieIntentClassifier</div>}
              {logisticC && 
              <div className='PipelineComponent'>
                LogisticRegressionClassifier
                <br/><br/>

                <TextField
                  type="number"
                  inputProps={{ logisticRegressionClassifierMaxIterValue }}
                  value={logisticRegressionClassifierMaxIter}
                  onChange={handleLogisticRegressionClassifierMaxIterChange}
                  variant="outlined"
                  label="Max Iterations"
                  className="TokenizerDropDowns"
                />

                <br/><br/>

                <TextField
                  value={logisticRegressionClassifierSolver}
                  onChange={handleLogisticRegressionClassifierSolverChange}
                  select // tell TextField to render select
                  label="Solver"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value="lbfgs">lbfgs</MenuItem>
                  <MenuItem value="newton-cg">newton-cg</MenuItem>
                  <MenuItem value="liblinear">liblinear</MenuItem>
                  <MenuItem value="sag">sag</MenuItem>
                  <MenuItem value="saga">saga</MenuItem>
                </TextField>

                <br/><br/>

                <TextField
                  type="number"
                  inputProps={{ step: ".01" }}
                  value={logisticRegressionClassifierTol}
                  onChange={handleLogisticRegressionClassifierTolChange}
                  variant="outlined"
                  label="Tolerance"
                  className="TokenizerDropDowns"
                />

                <br/><br/>

                <Checkbox checked={logisticRegressionClassifierHideTextField} onChange={handleLogisticRegressionClassifierHideTextFieldChange} name="logisticRegressionClassifierHideTextField" />

                <TextField
                  style={{width: "390px"}}
                  type="number"
                  inputProps={{ logisticRegressionClassifierMinRandomState }}
                  value={logisticRegressionClassifierRandomState}
                  onChange={handleLogisticRegressionClassifierRandomStateChange}
                  variant="outlined"
                  label="Random State"
                  disabled={!logisticRegressionClassifierHideTextField}
                />
              </div>}
              {skLearnC && 
              <div className='PipelineComponent'>
                SklearnIntentClassifier
                <br/><br/>

                <TextField
                  type="number"
                  inputProps={{ sklearnIntentClassifierMinC }}
                  value={sklearnIntentClassifierC1}
                  onChange={handleSklearnIntentClassifierC1Change}
                  variant="outlined"
                  label="First C Value"
                  className="TokenizerDropDowns"
                />

                <TextField
                  type="number"
                  inputProps={{ sklearnIntentClassifierMinC }}
                  value={sklearnIntentClassifierC2}
                  onChange={handleSklearnIntentClassifierC2Change}
                  variant="outlined"
                  label="Second C Value"
                  className="TokenizerDropDowns"
                />

                <TextField
                  type="number"
                  inputProps={{ sklearnIntentClassifierMinC }}
                  value={sklearnIntentClassifierC3}
                  onChange={handleSklearnIntentClassifierC3Change}
                  variant="outlined"
                  label="Third C Value"
                  className="TokenizerDropDowns"
                />

                <TextField
                  type="number"
                  inputProps={{ sklearnIntentClassifierMinC }}
                  value={sklearnIntentClassifierC4}
                  onChange={handleSklearnIntentClassifierC4Change}
                  variant="outlined"
                  label="Fourth C Value"
                  className="TokenizerDropDowns"
                />

                <TextField
                  type="number"
                  inputProps={{ sklearnIntentClassifierMinC }}
                  value={sklearnIntentClassifierC5}
                  onChange={handleSklearnIntentClassifierC5Change}
                  variant="outlined"
                  label="Fifth C Value"
                  className="TokenizerDropDowns"
                />

                <TextField
                  type="number"
                  inputProps={{ sklearnIntentClassifierMinC }}
                  value={sklearnIntentClassifierC6}
                  onChange={handleSklearnIntentClassifierC6Change}
                  variant="outlined"
                  label="Sixth C Value"
                  className="TokenizerDropDowns"
                />

                <br/><br/>

                <TextField
                  value={sklearnIntentClassifierKernels}
                  onChange={handleSklearnIntentClassifierKernelsChange}
                  select // tell TextField to render select
                  label="Kernel"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value="linear">linear</MenuItem>
                  <MenuItem value="poly">poly</MenuItem>
                  <MenuItem value="rbf">rbf</MenuItem>
                  <MenuItem value="sigmoid">sigmoid</MenuItem>
                  <MenuItem value="precomputed">precomputed</MenuItem>
                </TextField>

                <br/><br/>

                <TextField
                  type="number"
                  value={sklearnIntentClassifierGamma}
                  onChange={handleSklearnIntentClassifierGammaChange}
                  variant="outlined"
                  label="Gamma Value"
                  className="TokenizerDropDowns"
                />

                <br/><br/>

                <TextField
                  type="number"
                  inputProps={{ sklearnIntentClassifierMinMaxFolds }}
                  value={sklearnIntentClassifierMaxFolds}
                  onChange={handleSklearnIntentClassifierMaxFoldsChange}
                  variant="outlined"
                  label="Max Cross Validation Folds"
                  className="TokenizerDropDowns"
                />

                <br/><br/>

                <TextField
                  value={sklearnIntentClassifierScoringFunc}
                  onChange={handleSklearnIntentClassifierScoringFuncChange}
                  select // tell TextField to render select
                  label="Scoring Function"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value="f1_weighted">f1_weighted</MenuItem>
                  <MenuItem value="accuracy">accuracy</MenuItem>
                  <MenuItem value="balanced_accuracy">balanced_accuracy</MenuItem>
                  <MenuItem value="top_k_accuracy">top_k_accuracy</MenuItem>
                  <MenuItem value="average_precision">average_precision</MenuItem>
                  <MenuItem value="neg_brier_score">neg_brier_score</MenuItem>
                  <MenuItem value="f1">f1</MenuItem>
                  <MenuItem value="f1_micro">f1_micro</MenuItem>
                  <MenuItem value="f1_macro">f1_macro</MenuItem>
                  <MenuItem value="f1_samples">f1_samples</MenuItem>
                  <MenuItem value="neg_log_loss">neg_log_loss</MenuItem>
                  <MenuItem value="precision">precision</MenuItem>
                  <MenuItem value="recall">recall</MenuItem>
                  <MenuItem value="jaccard">jaccard</MenuItem>
                  <MenuItem value="roc_auc">roc_auc</MenuItem>
                  <MenuItem value="roc_auc_ovr">roc_auc_ovr</MenuItem>
                  <MenuItem value="roc_auc_ovo">roc_auc_ovo</MenuItem>
                  <MenuItem value="roc_auc_ovr_weighted">roc_auc_ovr_weighted</MenuItem>
                  <MenuItem value="roc_auc_ovo_weighted">roc_auc_ovo_weighted</MenuItem>
                </TextField>
              </div>}
              {keywordC && 
              <div className='PipelineComponent'>
                KeywordIntentClassifier
                <br/><br/>
                
                <TextField
                  value={keywordIntentClassifierCaseSensitive}
                  onChange={handleKeywordIntentClassifierCaseSensitiveChange}
                  select // tell TextField to render select
                  label="Case Sensitive"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </TextField>
              </div>}
              {dietC && 
              <div className='PipelineComponent'>
                DIETClassifier
                <br/><br/>

                <TextField
                  type="number"
                  inputProps={{ DIETClassifierMinEpochs }}
                  value={DIETClassifierEpochs}
                  onChange={handleDIETClassifierEpochsChange}
                  variant="outlined"
                  label="Epochs"
                  className="TokenizerDropDowns"
                />

                <br/><br/>
                
                <TextField
                  value={DIETClassifierEntityRecognition}
                  onChange={handleDIETClassifierEntityRecognitionChange}
                  select // tell TextField to render select
                  label="Entity Recognition"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </TextField>

                <br/><br/>
                
                <TextField
                  value={DIETClassifierIntentClassification}
                  onChange={handleDIETClassifierIntentClassificationChange}
                  select // tell TextField to render select
                  label="Intent Classification"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </TextField>
              </div>}
              {fallbackC && 
              <div className='PipelineComponent'>
                FallbackClassifier
                <br/><br/>

                <TextField
                  type="number"
                  inputProps={{ fallbackClassifierMinThreshold, fallbackClassifierMaxThreshold, step: ".1" }}
                  value={fallbackClassifierThreshold}
                  onChange={handleFallbackClassifierThresholdChange}
                  variant="outlined"
                  label="Threshold"
                  className="TokenizerDropDowns"
                />
              </div>}

              {mitieE && <div className='PipelineComponent'>MitieEntityExtractor</div>}
              {spacyE && 
              <div className='PipelineComponent'>
                SpacyEntityExtractor
                <br/><br/>

                <FormControl
                  // required
                  // error={lexicalSyntacticFeaturizerBeforeValuesError}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">Dimensions to Extract</FormLabel>
                  <FormGroup 
                    className="spacyEntityExtractorFormGroup"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox checked={person} onChange={handleSpacyEntityExtractorDimensionsChange} name="person" />
                      }
                      label="PERSON"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={loc} onChange={handleSpacyEntityExtractorDimensionsChange} name="loc" />
                      }
                      label="LOC"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={org} onChange={handleSpacyEntityExtractorDimensionsChange} name="org" />
                      }
                      label="ORG"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={product} onChange={handleSpacyEntityExtractorDimensionsChange} name="product" />
                      }
                      label="PRODUCT"
                    />
                  </FormGroup>
                  {/* <FormHelperText>Choose atleast one Before Token Feature</FormHelperText> */}
                </FormControl>
              </div>}
              {crfE && <div className='PipelineComponent'>CRFEntityExtractor</div>}
              {ducklingE && <div className='PipelineComponent'>DucklingEntityExtractor</div>}
              {regexE && <div className='PipelineComponent'>RegexEntityExtractor</div>}
              {entityE && <div className='PipelineComponent'>EntitySynonymMapper</div>}
            </div>
          </div>
          <div style={{clear: "both"}}/>
        {/* <Box style={{height: "1000px", width: "300px", backgroundColor: "red"}}> */}
        
        {/* </Box> */}
      </Container>
    </Page>
  );
}
