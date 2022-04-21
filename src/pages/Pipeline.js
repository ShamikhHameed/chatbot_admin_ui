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
import Button from '@mui/material/Button';

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

// const fs = require('fs');
// const YAML = require('json-to-pretty-yaml');

const yaml = require('js-yaml');

// ----------------------------------------------------------------------

export default function DashboardApp() {
  // used to check whether to display a component or not
  // const [languageModelValue, setLanguageModelValue] = React.useState("MitieNLP");
  const [languageModelValues, setLanguageModelValues] = React.useState({
    mitieLM: false,
    spacyLM: true
  });
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

  const CRFEntityExtractorMinMaxIterations = 1;
  const CRFEntityExtractorMinL1 = 0.0;
  const CRFEntityExtractorMaxL1 = 1.0;
  const CRFEntityExtractorMinL2 = 0.0;
  const CRFEntityExtractorMaxL2 = 1.0;

  const ducklingEntityExtractorURL = "http://localhost:";

  const ducklingEntityExtractorMinPortNo = 1024;
  const ducklingEntityExtractorMaxPortNo = 65535;

  const ducklingEntityExtractorMinTimeout = 1;

  let JSObjectPipeline;

  // LANGUAGE MODELS - State
  // select options state for MitieNLP
  const [mitieNLPModelPath, setMitieNLPModelPath] = React.useState("");

  // select options state for MitieNLP
  const [spacyNLPModelLang, setSpacyNLPModelLang] = React.useState("en_core_web_sm");
  const [spacyNLPCaseSensitive, setSpacyNLPCaseSensitive] = React.useState(false);

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
  const [conveRTFeaturizerModelUrl, setConveRTFeaturizerModelUrl] = React.useState("");

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

  const [lexicalSyntacticFeaturizerBeforeCheckedValues, setLexicalSyntacticFeaturizerBeforeCheckedValues] = React.useState(["low", "upper", "title"]);

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

  const [lexicalSyntacticFeaturizerTokenCheckedValues, setLexicalSyntacticFeaturizerTokenCheckedValues] = React.useState(["BOS", "EOS", "low", "upper", "title", "digit"]);

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

  const [lexicalSyntacticFeaturizerAfterCheckedValues, setLexicalSyntacticFeaturizerAfterCheckedValues] = React.useState(["low", "upper", "title"]);

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

  const [spacyEntityExtractorDimensionsCheckedValues, setSpacyEntityExtractorDimensionsCheckedValues] = React.useState(["LOC"]);

  // select options state for CRFEntityExtractor
  const [CRFEntityExtractorFlag, setCRFEntityExtractorFlag] = React.useState(true);
  
  const [CRFEntityExtractorBefore, setCRFEntityExtractorBefore] = React.useState({
    CRFEntityExtractorBeforeLow: true,
    CRFEntityExtractorBeforeUpper: true,
    CRFEntityExtractorBeforeTitle: true,
    CRFEntityExtractorBeforeDigit: false,
    CRFEntityExtractorBeforePrefix5: false,
    CRFEntityExtractorBeforePrefix2: false,
    CRFEntityExtractorBeforeSuffix5: false,
    CRFEntityExtractorBeforeSuffix3: false,
    CRFEntityExtractorBeforeSuffix2: false,
    CRFEntityExtractorBeforeSuffix1: false,
    // using below 2 requires SpacyTokenizer
    CRFEntityExtractorBeforePos: false,
    CRFEntityExtractorBeforePos2: false,
    // using below feature requires RegexFeaturizer
    CRFEntityExtractorBeforePattern: false,
    // using below feature requires LanguageModelFeaturizer
    CRFEntityExtractorBeforeBias: false,
    CRFEntityExtractorBeforeTextDenseFeatures: false,
  });

  const [CRFEntityExtractorBeforeCheckedValues, setCRFEntityExtractorBeforeCheckedValues] = React.useState(["low", "upper", "title"]);

  const [CRFEntityExtractorToken, setCRFEntityExtractorToken] = React.useState({
    CRFEntityExtractorTokenLow: true,
    CRFEntityExtractorTokenUpper: true,
    CRFEntityExtractorTokenTitle: true,
    CRFEntityExtractorTokenDigit: false,
    CRFEntityExtractorTokenPrefix5: false,
    CRFEntityExtractorTokenPrefix2: false,
    CRFEntityExtractorTokenSuffix5: false,
    CRFEntityExtractorTokenSuffix3: false,
    CRFEntityExtractorTokenSuffix2: false,
    CRFEntityExtractorTokenSuffix1: false,
    // using below 2 requires SpacyTokenizer
    CRFEntityExtractorTokenPos: false,
    CRFEntityExtractorTokenPos2: false,
    // using below feature requires RegexFeaturizer
    CRFEntityExtractorTokenPattern: false,
    // using below feature requires LanguageModelFeaturizer
    CRFEntityExtractorTokenBias: false,
    CRFEntityExtractorTokenTextDenseFeatures: false,
  });

  const [CRFEntityExtractorTokenCheckedValues, setCRFEntityExtractorTokenCheckedValues] = React.useState(["low", "upper", "title"]);

  const [CRFEntityExtractorAfter, setCRFEntityExtractorAfter] = React.useState({
    CRFEntityExtractorAfterLow: true,
    CRFEntityExtractorAfterUpper: true,
    CRFEntityExtractorAfterTitle: true,
    CRFEntityExtractorAfterDigit: false,
    CRFEntityExtractorAfterPrefix5: false,
    CRFEntityExtractorAfterPrefix2: false,
    CRFEntityExtractorAfterSuffix5: false,
    CRFEntityExtractorAfterSuffix3: false,
    CRFEntityExtractorAfterSuffix2: false,
    CRFEntityExtractorAfterSuffix1: false,
    // using below 2 requires SpacyTokenizer
    CRFEntityExtractorAfterPos: false,
    CRFEntityExtractorAfterPos2: false,
    // using below feature requires RegexFeaturizer
    CRFEntityExtractorAfterPattern: false,
    // using below feature requires LanguageModelFeaturizer
    CRFEntityExtractorAfterBias: false,
    CRFEntityExtractorAfterTextDenseFeatures: false,
  });

  const [CRFEntityExtractorAfterCheckedValues, setCRFEntityExtractorAfterCheckedValues] = React.useState(["low", "upper", "title"]);

  const [CRFEntityExtractorMaxIterations, setCRFEntityExtractorMaxIterations] = React.useState(50);
  const [CRFEntityExtractorL1, setCRFEntityExtractorL1] = React.useState(0.1);
  const [CRFEntityExtractorL2, setCRFEntityExtractorL2] = React.useState(0.1);
  const [CRFEntityExtractorSplitAddress, setCRFEntityExtractorSplitAddress] = React.useState(false);
  const [CRFEntityExtractorSplitEmail, setCRFEntityExtractorSplitEmail] = React.useState(true);

  // select options state for DucklingEntityExtractor
  const [ducklingEntityExtractorPortNo, setDucklingEntityExtractorPortNo] = React.useState(8080);

  const [ducklingEntityExtractorDimensions, setDucklingEntityExtractorDimensions] = React.useState({
    ducklingEntityExtractorTime: true,
    ducklingEntityExtractorNumber: true,
    ducklingEntityExtractorMoney: true,
    ducklingEntityExtractorDistance: true
  });

  const [ducklingEntityExtractorDimensionsCheckedValues, setDucklingEntityExtractorDimensionsCheckedValues] = React.useState(["time", "number", "amount-of-money", "distance"]);

  const [ducklingEntityExtractorTimeout, setDucklingEntityExtractorTimeout] = React.useState(3);

  // select options state for RegexEntityExtractor
  const [regexEntityExtractorCaseSensitive, setRegexEntityExtractorCaseSensitive] = React.useState(false);
  const [regexEntityExtractorLookupTables, setRegexEntityExtractorLookupTables] = React.useState(true);
  const [regexEntityExtractorRegexes, setRegexEntityExtractorRegexes] = React.useState(true);
  const [regexEntityExtractorWordBoundaries, setRegexEntityExtractorWordBoundaries] = React.useState(true);

  // used to handle change on whether to display a component or not

  // const handleLanguageModelChange = (event) => {
  //   setLanguageModelValue(event.target.value);
  // };

  const handleLanguageModelChange = (event) => {
    setLanguageModelValues({
      ...languageModelValues,
      [event.target.name]: event.target.checked,
    });
  };

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

  // LANGUAGE MODEL - handleChange
  // handle chnage for MitieNLPModel
  const handleMitieNLPModelPathChange = (event) => {
    setMitieNLPModelPath(event.target.value);
  }

  // handle chnage for MitieNLPModel
  const handleSpacyNLPModelLangChange = (event) => {
    setSpacyNLPModelLang(event.target.value);
  }

  const handleSpacyNLPCaseSensitiveChange = (event) => {
    setSpacyNLPCaseSensitive(event.target.value);
  }

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
  const handleConveRTFeaturizerModelUrlChange = (event) => {
    setConveRTFeaturizerModelUrl(event.target.value);
  }

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

    let newArray = [...lexicalSyntacticFeaturizerBeforeCheckedValues, event.target.value];
    if (lexicalSyntacticFeaturizerBeforeCheckedValues.includes(event.target.value)) {
      newArray = newArray.filter(val => val !== event.target.value);
    } 

    setLexicalSyntacticFeaturizerBeforeCheckedValues(newArray);
  };

  const handleLexicalSyntacticFeaturizerTokenChange = (event) => {
    setLexicalSyntacticFeaturizerToken({
      ...lexicalSyntacticFeaturizerToken,
      [event.target.name]: event.target.checked,
    });

    let newArray = [...lexicalSyntacticFeaturizerTokenCheckedValues, event.target.value];
    if (lexicalSyntacticFeaturizerTokenCheckedValues.includes(event.target.value)) {
      newArray = newArray.filter(val => val !== event.target.value);
    } 

    setLexicalSyntacticFeaturizerTokenCheckedValues(newArray);
  };

  const handleLexicalSyntacticFeaturizerAfterChange = (event) => {
    setLexicalSyntacticFeaturizerAfter({
      ...lexicalSyntacticFeaturizerAfter,
      [event.target.name]: event.target.checked,
    });

    let newArray = [...lexicalSyntacticFeaturizerAfterCheckedValues, event.target.value];
    if (lexicalSyntacticFeaturizerAfterCheckedValues.includes(event.target.value)) {
      newArray = newArray.filter(val => val !== event.target.value);
    } 

    setLexicalSyntacticFeaturizerAfterCheckedValues(newArray);
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

    let newArray = [...spacyEntityExtractorDimensionsCheckedValues, event.target.value];
    if (spacyEntityExtractorDimensionsCheckedValues.includes(event.target.value)) {
      newArray = newArray.filter(val => val !== event.target.value);
    } 

    setSpacyEntityExtractorDimensionsCheckedValues(newArray);
  };

  // handle chnage for CRFEntityExtractor
  const handleCRFEntityExtractorFlagChange = (event) => {
    setCRFEntityExtractorFlag(event.target.value);
  }

  const handleCRFEntityExtractorBeforeChange = (event) => {
    setCRFEntityExtractorBefore({
      ...CRFEntityExtractorBefore,
      [event.target.name]: event.target.checked,
    });

    let newArray = [...CRFEntityExtractorBeforeCheckedValues, event.target.value];
    if (CRFEntityExtractorBeforeCheckedValues.includes(event.target.value)) {
      newArray = newArray.filter(val => val !== event.target.value);
    } 

    setCRFEntityExtractorBeforeCheckedValues(newArray);
  };

  const handleCRFEntityExtractorTokenChange = (event) => {
    setCRFEntityExtractorToken({
      ...CRFEntityExtractorToken,
      [event.target.name]: event.target.checked,
    });

    let newArray = [...CRFEntityExtractorTokenCheckedValues, event.target.value];
    if (CRFEntityExtractorTokenCheckedValues.includes(event.target.value)) {
      newArray = newArray.filter(val => val !== event.target.value);
    } 

    setCRFEntityExtractorTokenCheckedValues(newArray);
  };

  const handleCRFEntityExtractorAfterChange = (event) => {
    setCRFEntityExtractorAfter({
      ...CRFEntityExtractorAfter,
      [event.target.name]: event.target.checked,
    });

    let newArray = [...CRFEntityExtractorAfterCheckedValues, event.target.value];
    if (CRFEntityExtractorAfterCheckedValues.includes(event.target.value)) {
      newArray = newArray.filter(val => val !== event.target.value);
    } 

    setCRFEntityExtractorAfterCheckedValues(newArray);
  };

  const handleCRFEntityExtractorMaxIterationsChange = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value < CRFEntityExtractorMinMaxIterations) value = CRFEntityExtractorMinMaxIterations;

    setCRFEntityExtractorMaxIterations(value);
  }

  const handleCRFEntityExtractorL1Change = (event) => {
    let value = parseFloat(event.target.value);

    if (value > CRFEntityExtractorMaxL1) value = CRFEntityExtractorMaxL1;
    if (value < CRFEntityExtractorMinL1) value = CRFEntityExtractorMinL1;

    setCRFEntityExtractorL1(value);
  }

  const handleCRFEntityExtractorL2Change = (event) => {
    let value = parseFloat(event.target.value);

    if (value > CRFEntityExtractorMaxL2) value = CRFEntityExtractorMaxL2;
    if (value < CRFEntityExtractorMinL2) value = CRFEntityExtractorMinL2;

    setCRFEntityExtractorL2(value);
  }

  const handleCRFEntityExtractorSplitAddressChange = (event) => {
    setCRFEntityExtractorSplitAddress(event.target.value);
  }

  const handleCRFEntityExtractorSplitEmailChange = (event) => {
    setCRFEntityExtractorSplitEmail(event.target.value);
  }

  // handle chnage for DucklingEntityExtractor
  const handleDucklingEntityExtractorPortNoChange = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value > ducklingEntityExtractorMaxPortNo) value = ducklingEntityExtractorMaxPortNo;
    if (value < ducklingEntityExtractorMinPortNo) value = ducklingEntityExtractorMinPortNo;

    setDucklingEntityExtractorPortNo(value);
  }

  const handleDucklingEntityExtractorDimensionsChange = (event) => {
    setDucklingEntityExtractorDimensions({
      ...ducklingEntityExtractorDimensions,
      [event.target.name]: event.target.checked,
    });

    let newArray = [...ducklingEntityExtractorDimensionsCheckedValues, event.target.value];
    if (ducklingEntityExtractorDimensionsCheckedValues.includes(event.target.value)) {
      newArray = newArray.filter(val => val !== event.target.value);
    } 

    setDucklingEntityExtractorDimensionsCheckedValues(newArray);
  };

  const handleDucklingEntityExtractorTimeoutChange = (event) => {
    let value = parseInt(event.target.value, 10);

    if (value < ducklingEntityExtractorMinTimeout) value = ducklingEntityExtractorMinTimeout;

    setDucklingEntityExtractorTimeout(value);
  }

  // handle chnage for RegexEntityExtractor
  const handleRegexEntityExtractorCaseSensitiveChange = (event) => {
    setRegexEntityExtractorCaseSensitive(event.target.value);
  }

  const handleRegexEntityExtractorLookupTablesChange = (event) => {
    setRegexEntityExtractorLookupTables(event.target.value);
  }

  const handleRegexEntityExtractorRegexesChange = (event) => {
    setRegexEntityExtractorRegexes(event.target.value);
  }

  const handleRegexEntityExtractorWordBoundariesChange = (event) => {
    setRegexEntityExtractorWordBoundaries(event.target.value);
  }


  const { mitieLM, spacyLM } = languageModelValues;

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

  // for CRFEntityExtractor
  const { CRFEntityExtractorBeforeLow, CRFEntityExtractorBeforeUpper, CRFEntityExtractorBeforeTitle, CRFEntityExtractorBeforeDigit, CRFEntityExtractorBeforePrefix5, CRFEntityExtractorBeforePrefix2, CRFEntityExtractorBeforeSuffix5, CRFEntityExtractorBeforeSuffix3, CRFEntityExtractorBeforeSuffix2, CRFEntityExtractorBeforeSuffix1, CRFEntityExtractorBeforePos, CRFEntityExtractorBeforePos2, CRFEntityExtractorBeforePattern, CRFEntityExtractorBeforeBias, CRFEntityExtractorBeforeTextDenseFeatures } = CRFEntityExtractorBefore;
  const CRFEntityExtractorBeforeValuesError = [CRFEntityExtractorBeforeLow, CRFEntityExtractorBeforeUpper, CRFEntityExtractorBeforeTitle, CRFEntityExtractorBeforeDigit, CRFEntityExtractorBeforePrefix5, CRFEntityExtractorBeforePrefix2, CRFEntityExtractorBeforeSuffix5, CRFEntityExtractorBeforeSuffix3, CRFEntityExtractorBeforeSuffix2, CRFEntityExtractorBeforeSuffix1, CRFEntityExtractorBeforePos, CRFEntityExtractorBeforePos2, CRFEntityExtractorBeforePattern, CRFEntityExtractorBeforeBias, CRFEntityExtractorBeforeTextDenseFeatures].filter((v) => v).length === 0;

  const { CRFEntityExtractorTokenLow, CRFEntityExtractorTokenUpper, CRFEntityExtractorTokenTitle, CRFEntityExtractorTokenDigit, CRFEntityExtractorTokenPrefix5, CRFEntityExtractorTokenPrefix2, CRFEntityExtractorTokenSuffix5, CRFEntityExtractorTokenSuffix3, CRFEntityExtractorTokenSuffix2, CRFEntityExtractorTokenSuffix1, CRFEntityExtractorTokenPos, CRFEntityExtractorTokenPos2, CRFEntityExtractorTokenPattern, CRFEntityExtractorTokenBias, CRFEntityExtractorTokenTextDenseFeatures } = CRFEntityExtractorToken;
  const CRFEntityExtractorTokenValuesError = [CRFEntityExtractorTokenLow, CRFEntityExtractorTokenUpper, CRFEntityExtractorTokenTitle, CRFEntityExtractorTokenDigit, CRFEntityExtractorTokenPrefix5, CRFEntityExtractorTokenPrefix2, CRFEntityExtractorTokenSuffix5, CRFEntityExtractorTokenSuffix3, CRFEntityExtractorTokenSuffix2, CRFEntityExtractorTokenSuffix1, CRFEntityExtractorTokenPos, CRFEntityExtractorTokenPos2, CRFEntityExtractorTokenPattern, CRFEntityExtractorTokenBias, CRFEntityExtractorTokenTextDenseFeatures].filter((v) => v).length === 0;

  const { CRFEntityExtractorAfterLow, CRFEntityExtractorAfterUpper, CRFEntityExtractorAfterTitle, CRFEntityExtractorAfterDigit, CRFEntityExtractorAfterPrefix5, CRFEntityExtractorAfterPrefix2, CRFEntityExtractorAfterSuffix5, CRFEntityExtractorAfterSuffix3, CRFEntityExtractorAfterSuffix2, CRFEntityExtractorAfterSuffix1, CRFEntityExtractorAfterPos, CRFEntityExtractorAfterPos2, CRFEntityExtractorAfterPattern, CRFEntityExtractorAfterBias, CRFEntityExtractorAfterTextDenseFeatures } = CRFEntityExtractorAfter;
  const CRFEntityExtractorAfterValuesError = [CRFEntityExtractorAfterLow, CRFEntityExtractorAfterUpper, CRFEntityExtractorAfterTitle, CRFEntityExtractorAfterDigit, CRFEntityExtractorAfterPrefix5, CRFEntityExtractorAfterPrefix2, CRFEntityExtractorAfterSuffix5, CRFEntityExtractorAfterSuffix3, CRFEntityExtractorAfterSuffix2, CRFEntityExtractorAfterSuffix1, CRFEntityExtractorAfterPos, CRFEntityExtractorAfterPos2, CRFEntityExtractorAfterPattern, CRFEntityExtractorAfterBias, CRFEntityExtractorAfterTextDenseFeatures].filter((v) => v).length === 0;

  // for DucklingEntityExtractor
  const { ducklingEntityExtractorTime, ducklingEntityExtractorNumber, ducklingEntityExtractorMoney, ducklingEntityExtractorDistance } = ducklingEntityExtractorDimensions;
  const ducklingEntityExtractorDimensionsValuesError = [ducklingEntityExtractorTime, ducklingEntityExtractorNumber, ducklingEntityExtractorMoney, ducklingEntityExtractorDistance].filter((v) => v).length === 0;


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

  // method to convert the variables into a js object
  const generateJSObjectPipeline = () => {
    JSObjectPipeline = {
      "pipeline": [
        // rendering the language model components
        // (languageModelValue === "MitieNLP" ? {
        //   "name": "MitieNLP",
        //   "model": mitieNLPModelPath
        // } : null),
        // (languageModelValue === "SpacyNLP" ? {
        //   "name": "SpacyNLP",
        //   "model": spacyNLPModelLang,
        //   "case_sensitive": spacyNLPCaseSensitive
        // } : null),

        (languageModelValues.mitieLM === true ? {
          "name": "MitieNLP",
          "model": mitieNLPModelPath
        } : null),
        (languageModelValues.spacyLM === true ? {
          "name": "SpacyNLP",
          "model": spacyNLPModelLang,
          "case_sensitive": spacyNLPCaseSensitive
        } : null),

        // rendering the tokenizer components
        (tokenizerValue === "WhitespaceTokenizer" ? {
          "name": "WhitespaceTokenizer",
          "intent_tokenization_flag": whitespaceTokenizerFlag,
          "intent_split_symbol": whitespaceTokenizerSplitSymbol,
          "token_pattern": whitespaceTokenizerTokenPattern
        } : null),
        (tokenizerValue === "JiebaTokenizer" ? {
          "name": "JiebaTokenizer",
          "intent_tokenization_flag": jiebaTokenizerFlag,
          "intent_split_symbol": jiebaTokenizerSplitSymbol,
          "token_pattern": jiebaTokenizerTokenPattern
        } : null),
        (tokenizerValue === "JiebaTokenizer" ? {
          "name": "JiebaTokenizer",
          "intent_tokenization_flag": jiebaTokenizerFlag,
          "intent_split_symbol": jiebaTokenizerSplitSymbol,
          "token_pattern": jiebaTokenizerTokenPattern
        } : null),
        (tokenizerValue === "MitieTokenizer" ? {
          "name": "MitieTokenizer",
          "intent_tokenization_flag": mitieTokenizerFlag,
          "intent_split_symbol": mitieTokenizerSplitSymbol,
          "token_pattern": mitieTokenizerTokenPattern
        } : null),
        (tokenizerValue === "SpacyTokenizer" ? {
          "name": "SpacyTokenizer",
          "intent_tokenization_flag": spacyTokenizerFlag,
          "intent_split_symbol": spacyTokenizerSplitSymbol,
          "token_pattern": spacyTokenizerTokenPattern
        } : null),
        // rendering the featurizer components
        (featurizerValues.mitieF === true ? {
          "name": "MitieFeaturizer",
          "pooling": mitieFeaturizerPooling
        } : null),
        (featurizerValues.spacyF === true ? {
          "name": "SpacyFeaturizer",
          "pooling": spacyFeaturizerPooling
        } : null),
        (featurizerValues.convertF === true ? {
          "name": "ConveRTFeaturizer",
          "model_url": conveRTFeaturizerModelUrl
        } : null),
        (featurizerValues.languageModelF === true ? {
          "name": "LanguageModelFeaturizer",
          "model_name": languageModelFeaturizerModelName,
          "model_weights": languageModelFeaturizerModelWeight,
          "cache_dir": languageModelFeaturizerCacheDir
        } : null),
        (featurizerValues.regexF === true && regexFeaturizerHidePatternsTextField === true ? {
          "name": "RegexFeaturizer",
          "case_sensitive": regexFeaturizerCaseSensitive,
          "use_word_boundaries": regexFeaturizerWordBoundaries,
          "number_additional_patterns": regexFeaturizerNumOfPatterns
        } : null),
        (featurizerValues.regexF === true && regexFeaturizerHidePatternsTextField === false ? {
          "name": "RegexFeaturizer",
          "case_sensitive": regexFeaturizerCaseSensitive,
          "use_word_boundaries": regexFeaturizerWordBoundaries
        } : null),
        (featurizerValues.countVectorsF === true ? {
          "name": "CountVectorsFeaturizer",
          "analyzer": countVectorsFeaturizerAnalyzer,
          "min_ngram": countVectorsFeaturizerMinNGram,
          "max_ngram": countVectorsFeaturizerMaxNGram,
          "OOV_token": countVectorsFeaturizerOOVToken,
          "use_shared_vocab": countVectorsFeaturizerSharedVocab,
          "additional_vocabulary_size": {
            "text": countVectorsFeaturizerTextSize,
            "response": countVectorsFeaturizerResponseSize,
            "action_text": countVectorsFeaturizerActionTextSize
          }
        } : null),
        (featurizerValues.lexicalSyntacticF === true ? {
          "name": "LexicalSyntacticFeaturizer",
          "features": [
            lexicalSyntacticFeaturizerBeforeCheckedValues,
            lexicalSyntacticFeaturizerTokenCheckedValues,
            lexicalSyntacticFeaturizerAfterCheckedValues,
          ]
        } : null),
        (classifierValues.mitieC === true ? {
          "name": "MitieIntentClassifier"
        } : null),
        (classifierValues.logisticC === true && regexFeaturizerHidePatternsTextField === true ? {
          "name": "LogisticRegressionClassifier",
          "max_iter": logisticRegressionClassifierMaxIter,
          "solver": logisticRegressionClassifierSolver,
          "tol": logisticRegressionClassifierTol,
          "random_state": logisticRegressionClassifierRandomState
        } : null),
        (classifierValues.logisticC === true && regexFeaturizerHidePatternsTextField === false ? {
          "name": "LogisticRegressionClassifier",
          "max_iter": logisticRegressionClassifierMaxIter,
          "solver": logisticRegressionClassifierSolver,
          "tol": logisticRegressionClassifierTol
        } : null),
        (classifierValues.skLearnC === true ? {
          "name": "SklearnIntentClassifier",
          "C": [sklearnIntentClassifierC1, sklearnIntentClassifierC2, sklearnIntentClassifierC3, sklearnIntentClassifierC4, sklearnIntentClassifierC5, sklearnIntentClassifierC6],
          "kernels": [sklearnIntentClassifierKernels],
          "gamma": [sklearnIntentClassifierGamma],
          "max_cross_validation_folds": sklearnIntentClassifierMaxFolds,
          "scoring_function": sklearnIntentClassifierScoringFunc
        } : null),
        (classifierValues.keywordC === true ? {
          "name": "KeywordIntentClassifier",
          "case_sensitive": keywordIntentClassifierCaseSensitive,
        } : null),
        (classifierValues.dietC === true ? {
          "name": "DIETClassifier",
          "epochs": DIETClassifierEpochs,
          "entity_recognition": DIETClassifierEntityRecognition,
          "intent_classification": DIETClassifierIntentClassification
        } : null),
        (classifierValues.fallbackC === true ? {
          "name": "FallbackClassifier",
          "threshold": fallbackClassifierThreshold
        } : null),
        (classifierValues.mitieC === true ? {
          "name": "MitieEntityExtractor"
        } : null),
        (extractorValues.spacyE === true ? {
          "name": "SpacyEntityExtractor",
          "dimensions": spacyEntityExtractorDimensionsCheckedValues
        } : null),
        (extractorValues.crfE === true ? {
          "name": "CRFEntityExtractor",
          "BILOU_flag": CRFEntityExtractorFlag,
          "features": [
            CRFEntityExtractorBeforeCheckedValues,
            CRFEntityExtractorTokenCheckedValues,
            CRFEntityExtractorAfterCheckedValues
          ],
          "max_iterations": CRFEntityExtractorMaxIterations,
          "L1_c": CRFEntityExtractorL1,
          "L2_c": CRFEntityExtractorL2,
          "split_entities_by_comma": {
            "address": CRFEntityExtractorSplitAddress,
            "email": CRFEntityExtractorSplitEmail
          }
        } : null),
        (extractorValues.ducklingE === true ? {
          "name": "DucklingEntityExtractor",
          "url": ducklingEntityExtractorURL + ducklingEntityExtractorPortNo,
          "dimensions": ducklingEntityExtractorDimensionsCheckedValues,
          "timeout": ducklingEntityExtractorTimeout
        } : null),
        (extractorValues.regexE === true ? {
          "name": "RegexEntityExtractor",
          "case_sensitive": regexEntityExtractorCaseSensitive,
          "use_lookup_tables": regexEntityExtractorLookupTables,
          "use_regexes": regexEntityExtractorRegexes,
          "use_word_boundaries": regexEntityExtractorWordBoundaries
        } : null),
        (extractorValues.entityE === true ? {
          "name": "EntitySynonymMapper"
        } : null),
      ]
    }
  }

  const trainModel = async () => {
    await generateJSObjectPipeline();
    const JSObjectPipelineNullRemoved = JSObjectPipeline.pipeline.filter(x => x !== null);
    console.log("JSON");
    console.log(JSON.stringify(JSObjectPipelineNullRemoved));
    console.log("YAML");
    // console.log(YAML.stringify(JSON.stringify(JSObjectPipeline)));
    console.log(yaml.dump(JSObjectPipelineNullRemoved));
    // const data = YAML.stringify(JSON.stringify(JSObjectPipeline));
    // fs.writeFile('YAML-PIPELINE.yaml', data);
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
        <div style={{height: "100vh", width: "76vw"}}>
            <div style={{height: "100vh", width: "17vw", float: "left"}}>

            {/* commented this out caus of radio button. implemented checkbox below */}
            {/* <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">Tokenizers</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={languageModelValue}
                onChange={handleLanguageModelChange}
              >
                <FormControlLabel value="MitieNLP" control={<Radio />} label="MitieNLP" />
                <FormControlLabel value="SpacyNLP" control={<Radio />} label="SpacyNLP" />
              </RadioGroup>
            </FormControl> */}

              <FormControl
              component="fieldset"
              variant="standard"
            >
              <FormLabel component="legend">Language Models</FormLabel>
              <FormGroup>
                {/* commented this out so that user cannot choose this open. Uncomment if needed */}
                {/* <FormControlLabel
                  control={
                    <Checkbox checked={mitieLM} onChange={handleLanguageModelChange} name="mitieLM" />
                  }
                  label="MitieNLP"
                /> */}
                <FormControlLabel
                  control={
                    <Checkbox checked={spacyLM} onChange={handleLanguageModelChange} name="spacyLM" />
                  }
                  label="SpacyNLP"
                />
              </FormGroup>
            </FormControl>
            <br/><br/>

            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">Tokenizers</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={tokenizerValue}
                onChange={handleTokenizerChange}
              >
                <FormControlLabel value="WhitespaceTokenizer" control={<Radio />} label="WhitespaceTokenizer" />
                {/* commented this out so that user cannot choose this open. Uncomment if needed */}
                {/* <FormControlLabel value="JiebaTokenizer" control={<Radio />} label="JiebaTokenizer" /> */}
                <FormControlLabel value="MitieTokenizer" control={<Radio />} label="MitieTokenizer" />
                <FormControlLabel value="SpacyTokenizer" control={<Radio />} label="SpacyTokenizer" />
              </RadioGroup>
            </FormControl>
            <br/><br/>

            <FormControl
              // required
              // error={featurizerError}
              component="fieldset"
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
                {/* commented this out so that user cannot choose this open. Uncomment if needed */}
                {/* <FormControlLabel
                  control={
                    <Checkbox checked={convertF} onChange={handleFeaturizerChange} name="convertF" />
                  }
                  label="ConveRTFeaturizer"
                /> */}
                {/* <FormControlLabel
                  control={
                    <Checkbox checked={languageModelF} onChange={handleFeaturizerChange} name="languageModelF" />
                  }
                  label="LanguageModelFeaturizer"
                /> */}
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
              {/* <FormHelperText>Choose atleast one Featurizer</FormHelperText> */}
            </FormControl>
            <br/><br/>

            <FormControl
              // required
              // error={classifierError}
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
              {/* <FormHelperText>Choose atleast one Classifier</FormHelperText> */}
            </FormControl>
            <br/><br/>

            <FormControl
              // required
              // error={extractorError}
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
                {/* <FormControlLabel
                  control={
                    <Checkbox checked={ducklingE} onChange={handleExtractorChange} name="ducklingE" />
                  }
                  label="DucklingEntityExtractor"
                /> */}
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
              {/* <FormHelperText>Choose atleast one Extractor</FormHelperText> */}
            </FormControl>
            </div>
            <div style={{height: "100vh", width: "59vw", float: "left"}}>
              {/* {languageModelValue === "MitieNLP" &&  */}
              {mitieLM &&
              <div className='PipelineComponent'>
                MitieNLP
                <br/><br/>

                <TextField
                  value={mitieNLPModelPath}
                  onChange={handleMitieNLPModelPathChange}
                  variant="outlined"
                  label="Path to Model"
                  className="TokenizerDropDowns"
                />
              </div>}

              {/* {languageModelValue === "SpacyNLP" &&  */}
              {spacyLM &&
              <div className='PipelineComponent'>
                SpacyNLP
                <br/><br/>
                
                <TextField
                  value={spacyNLPModelLang}
                  onChange={handleSpacyNLPModelLangChange}
                  select // tell TextField to render select
                  label="Language"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value="ca_core_news_sm">Catalan</MenuItem>
                  <MenuItem value="zh_core_web_sm">Chinese</MenuItem>
                  <MenuItem value="da_core_news_sm">Danish</MenuItem>
                  <MenuItem value="nl_core_news_sm">Dutch</MenuItem>
                  <MenuItem value="en_core_web_sm">English</MenuItem>
                  <MenuItem value="fr_core_news_sm">French</MenuItem>
                  <MenuItem value="de_core_news_sm">German</MenuItem>
                  <MenuItem value="el_core_news_sm">Greek</MenuItem>
                  <MenuItem value="it_core_news_sm">Italian</MenuItem>
                  <MenuItem value="ja_core_news_sm">Japanese</MenuItem>
                  <MenuItem value="lt_core_news_sm">Lithuanian</MenuItem>
                  <MenuItem value="mk_core_news_sm">Macedonian</MenuItem>
                  <MenuItem value="xx_ent_wiki_sm">Multi-language</MenuItem>
                  <MenuItem value="nb_core_news_sm">Norwegian Bokmål</MenuItem>
                  <MenuItem value="pl_core_news_sm">Polish</MenuItem>
                  <MenuItem value="pt_core_news_sm">Portuguese</MenuItem>
                  <MenuItem value="ro_core_news_sm">Romanian</MenuItem>
                  <MenuItem value="ru_core_news_sm">Russia</MenuItem>
                  <MenuItem value="es_core_news_sm">Spanish</MenuItem>
                </TextField>

                <br/><br/>
                
                <TextField
                  value={spacyNLPCaseSensitive}
                  onChange={handleSpacyNLPCaseSensitiveChange}
                  select // tell TextField to render select
                  label="Case Sensitive"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value={false}>False</MenuItem>
                  <MenuItem value>True</MenuItem>
                </TextField>
              </div>}

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
                <br/><br/>

                <TextField
                  value={conveRTFeaturizerModelUrl}
                  onChange={handleConveRTFeaturizerModelUrlChange}
                  variant="outlined"
                  label="Model URL"
                  className="TokenizerDropDowns"
                />
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
                        <Checkbox className="lexicalSyntacticFeaturizerCheckBox" checked={beforeBOS} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeBOS" value="BOS" />
                      }
                      label="BOS"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox className="lexicalSyntacticFeaturizerCheckBox" checked={beforeEOS} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeEOS" value="EOS" />
                      }
                      label="EOS"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox className="lexicalSyntacticFeaturizerCheckBox" checked={beforeLow} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeLow" value="low" />
                      }
                      label="low"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox className="lexicalSyntacticFeaturizerCheckBox" checked={beforeUpper} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeUpper" value="upper" />
                      }
                      label="upper"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox className="lexicalSyntacticFeaturizerCheckBox" checked={beforeTitle} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeTitle" value="title" />
                      }
                      label="title"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox className="lexicalSyntacticFeaturizerCheckBox" checked={beforeDigit} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeDigit" value="digit" />
                      }
                      label="digit"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox className="lexicalSyntacticFeaturizerCheckBox" checked={beforePrefix5} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforePrefix5" value="prefix5" />
                      }
                      label="prefix5"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox className="lexicalSyntacticFeaturizerCheckBox" checked={beforePrefix2} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforePrefix2" value="prefix2" />
                      }
                      label="prefix2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox className="lexicalSyntacticFeaturizerCheckBox" checked={beforeSuffix5} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeSuffix5" value="suffix5" />
                      }
                      label="suffix5"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox className="lexicalSyntacticFeaturizerCheckBox" checked={beforeSuffix3} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeSuffix3" value="suffix3" />
                      }
                      label="suffix3"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox className="lexicalSyntacticFeaturizerCheckBox" checked={beforeSuffix2} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeSuffix2" value="suffix2" />
                      }
                      label="suffix2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox className="lexicalSyntacticFeaturizerCheckBox" checked={beforeSuffix1} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforeSuffix1" value="suffix1" />
                      }
                      label="suffix1"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox className="lexicalSyntacticFeaturizerCheckBox" checked={beforePos} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforePos" value="pos" />
                      }
                      label="pos"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox className="lexicalSyntacticFeaturizerCheckBox" checked={beforePos2} onChange={handleLexicalSyntacticFeaturizerBeforeChange} name="beforePos2" value="pos2" />
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
                        <Checkbox checked={tokenBOS} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenBOS" value="BOS" />
                      }
                      label="BOS"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenEOS} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenEOS" value="EOS" />
                      }
                      label="EOS"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenLow} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenLow" value="low" />
                      }
                      label="low"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenUpper} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenUpper" value="upper" />
                      }
                      label="upper"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenTitle} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenTitle" value="title" />
                      }
                      label="title"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenDigit} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenDigit" value="digit" />
                      }
                      label="digit"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenPrefix5} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenPrefix5" value="prefix5" />
                      }
                      label="prefix5"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenPrefix2} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenPrefix2" value="prefix2" />
                      }
                      label="prefix2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenSuffix5} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenSuffix5" value="suffix5" />
                      }
                      label="suffix5"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenSuffix3} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenSuffix3" value="suffix3" />
                      }
                      label="suffix3"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenSuffix2} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenSuffix2" value="suffix2" />
                      }
                      label="suffix2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenSuffix1} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenSuffix1" value="suffix1" />
                      }
                      label="suffix1"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenPos} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenPos" value="pos" />
                      }
                      label="pos"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={tokenPos2} onChange={handleLexicalSyntacticFeaturizerTokenChange} name="tokenPos2" value="pos2" />
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
                        <Checkbox checked={afterBOS} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterBOS" value="BOS" />
                      }
                      label="BOS"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterEOS} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterEOS" value="EOS" />
                      }
                      label="EOS"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterLow} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterLow" value="low" />
                      }
                      label="low"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterUpper} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterUpper" value="upper" />
                      }
                      label="upper"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterTitle} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterTitle" value="title" />
                      }
                      label="title"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterDigit} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterDigit" value="digit" />
                      }
                      label="digit"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterPrefix5} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterPrefix5" value="prefix5" />
                      }
                      label="prefix5"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterPrefix2} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterPrefix2" value="prefix2" />
                      }
                      label="prefix2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterSuffix5} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterSuffix5" value="suffix5" />
                      }
                      label="suffix5"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterSuffix3} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterSuffix3" value="suffix3" />
                      }
                      label="suffix3"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterSuffix2} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterSuffix2" value="suffix2" />
                      }
                      label="suffix2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterSuffix1} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterSuffix1" value="suffix1" />
                      }
                      label="suffix1"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterPos} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterPos" value="pos" />
                      }
                      label="pos"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={afterPos2} onChange={handleLexicalSyntacticFeaturizerAfterChange} name="afterPos2" value="pos2" />
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
                        <Checkbox checked={person} onChange={handleSpacyEntityExtractorDimensionsChange} name="person" value="PERSON" />
                      }
                      label="PERSON"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={loc} onChange={handleSpacyEntityExtractorDimensionsChange} name="loc" value="LOC" />
                      }
                      label="LOC"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={org} onChange={handleSpacyEntityExtractorDimensionsChange} name="org" value="ORG" />
                      }
                      label="ORG"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={product} onChange={handleSpacyEntityExtractorDimensionsChange} name="product" value="PRODUCT" />
                      }
                      label="PRODUCT"
                    />
                  </FormGroup>
                  {/* <FormHelperText>Choose atleast one Before Token Feature</FormHelperText> */}
                </FormControl>
              </div>}
              {crfE && 
              <div className='PipelineComponent'>
                CRFEntityExtractor
                <br/><br/>
                
                <TextField
                  value={CRFEntityExtractorFlag}
                  onChange={handleCRFEntityExtractorFlagChange}
                  select // tell TextField to render select
                  label="BILOU Flag"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </TextField>

                <br/><br/>

                <FormControl
                  required
                  error={CRFEntityExtractorBeforeValuesError}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">Before Features</FormLabel>
                  <FormGroup
                    className="lexicalSyntacticFeaturizerFormGroup"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorBeforeLow} onChange={handleCRFEntityExtractorBeforeChange} name="CRFEntityExtractorBeforeLow" value="low" />
                      }
                      label="low"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorBeforeUpper} onChange={handleCRFEntityExtractorBeforeChange} name="CRFEntityExtractorBeforeUpper" value="upper" />
                      }
                      label="upper"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorBeforeTitle} onChange={handleCRFEntityExtractorBeforeChange} name="CRFEntityExtractorBeforeTitle" value="title" />
                      }
                      label="title"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorBeforeDigit} onChange={handleCRFEntityExtractorBeforeChange} name="CRFEntityExtractorBeforeDigit" value="digit" />
                      }
                      label="digit"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorBeforePrefix5} onChange={handleCRFEntityExtractorBeforeChange} name="CRFEntityExtractorBeforePrefix5" value="prefix5" />
                      }
                      label="prefix5"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorBeforePrefix2} onChange={handleCRFEntityExtractorBeforeChange} name="CRFEntityExtractorBeforePrefix2" value="prefix2" />
                      }
                      label="prefix2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorBeforeSuffix5} onChange={handleCRFEntityExtractorBeforeChange} name="CRFEntityExtractorBeforeSuffix5" value="suffix5" />
                      }
                      label="suffix5"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorBeforeSuffix3} onChange={handleCRFEntityExtractorBeforeChange} name="CRFEntityExtractorBeforeSuffix3" value="suffix3" />
                      }
                      label="suffix3"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorBeforeSuffix2} onChange={handleCRFEntityExtractorBeforeChange} name="CRFEntityExtractorBeforeSuffix2" value="suffix2" />
                      }
                      label="suffix2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorBeforeSuffix1} onChange={handleCRFEntityExtractorBeforeChange} name="CRFEntityExtractorBeforeSuffix1" value="suffix1" />
                      }
                      label="suffix1"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorBeforePos} onChange={handleCRFEntityExtractorBeforeChange} name="CRFEntityExtractorBeforePos" value="pos" />
                      }
                      label="pos"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorBeforePos2} onChange={handleCRFEntityExtractorBeforeChange} name="CRFEntityExtractorBeforePos2" value="pos2" />
                      }
                      label="pos2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorBeforePattern} onChange={handleCRFEntityExtractorBeforeChange} name="CRFEntityExtractorBeforePattern" value="pattern" />
                      }
                      label="pattern"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorBeforeBias} onChange={handleCRFEntityExtractorBeforeChange} name="CRFEntityExtractorBeforeBias" value="bias" />
                      }
                      label="bias"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorBeforeTextDenseFeatures} onChange={handleCRFEntityExtractorBeforeChange} name="CRFEntityExtractorBeforeTextDenseFeatures" value="text_dense_features" />
                      }
                      label="text_dense_features"
                    />
                  </FormGroup>
                  <FormHelperText>Choose atleast one Before Feature</FormHelperText>
                </FormControl>

                <br/><br/>

                <FormControl
                  required
                  error={CRFEntityExtractorTokenValuesError}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">Token Features</FormLabel>
                  <FormGroup
                    className="lexicalSyntacticFeaturizerFormGroup"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorTokenLow} onChange={handleCRFEntityExtractorTokenChange} name="CRFEntityExtractorTokenLow" value="low" />
                      }
                      label="low"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorTokenUpper} onChange={handleCRFEntityExtractorTokenChange} name="CRFEntityExtractorTokenUpper" value="upper" />
                      }
                      label="upper"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorTokenTitle} onChange={handleCRFEntityExtractorTokenChange} name="CRFEntityExtractorTokenTitle" value="title" />
                      }
                      label="title"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorTokenDigit} onChange={handleCRFEntityExtractorTokenChange} name="CRFEntityExtractorTokenDigit" value="digit" />
                      }
                      label="digit"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorTokenPrefix5} onChange={handleCRFEntityExtractorTokenChange} name="CRFEntityExtractorTokenPrefix5" value="prefix5" />
                      }
                      label="prefix5"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorTokenPrefix2} onChange={handleCRFEntityExtractorTokenChange} name="CRFEntityExtractorTokenPrefix2" value="prefix2" />
                      }
                      label="prefix2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorTokenSuffix5} onChange={handleCRFEntityExtractorTokenChange} name="CRFEntityExtractorTokenSuffix5" value="suffix5" />
                      }
                      label="suffix5"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorTokenSuffix3} onChange={handleCRFEntityExtractorTokenChange} name="CRFEntityExtractorTokenSuffix3" value="suffix3" />
                      }
                      label="suffix3"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorTokenSuffix2} onChange={handleCRFEntityExtractorTokenChange} name="CRFEntityExtractorTokenSuffix2" value="suffix2" />
                      }
                      label="suffix2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorTokenSuffix1} onChange={handleCRFEntityExtractorTokenChange} name="CRFEntityExtractorTokenSuffix1" value="suffix1" />
                      }
                      label="suffix1"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorTokenPos} onChange={handleCRFEntityExtractorTokenChange} name="CRFEntityExtractorTokenPos" value="pos" />
                      }
                      label="pos"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorTokenPos2} onChange={handleCRFEntityExtractorTokenChange} name="CRFEntityExtractorTokenPos2" value="pos2" />
                      }
                      label="pos2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorTokenPattern} onChange={handleCRFEntityExtractorTokenChange} name="CRFEntityExtractorTokenPattern" value="pattern" />
                      }
                      label="pattern"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorTokenBias} onChange={handleCRFEntityExtractorTokenChange} name="CRFEntityExtractorTokenBias" value="bias" />
                      }
                      label="bias"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorTokenTextDenseFeatures} onChange={handleCRFEntityExtractorTokenChange} name="CRFEntityExtractorTokenTextDenseFeatures" value="text_dense_features" />
                      }
                      label="text_dense_features"
                    />
                  </FormGroup>
                  <FormHelperText>Choose atleast one Token Feature</FormHelperText>
                </FormControl>

                <br/><br/>

                <FormControl
                  required
                  error={CRFEntityExtractorAfterValuesError}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">After Features</FormLabel>
                  <FormGroup
                    className="lexicalSyntacticFeaturizerFormGroup"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorAfterLow} onChange={handleCRFEntityExtractorAfterChange} name="CRFEntityExtractorAfterLow" value="low" />
                      }
                      label="low"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorAfterUpper} onChange={handleCRFEntityExtractorAfterChange} name="CRFEntityExtractorAfterUpper" value="upper" />
                      }
                      label="upper"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorAfterTitle} onChange={handleCRFEntityExtractorAfterChange} name="CRFEntityExtractorAfterTitle" value="title" />
                      }
                      label="title"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorAfterDigit} onChange={handleCRFEntityExtractorAfterChange} name="CRFEntityExtractorAfterDigit" value="digit" />
                      }
                      label="digit"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorAfterPrefix5} onChange={handleCRFEntityExtractorAfterChange} name="CRFEntityExtractorAfterPrefix5" value="prefix5" />
                      }
                      label="prefix5"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorAfterPrefix2} onChange={handleCRFEntityExtractorAfterChange} name="CRFEntityExtractorAfterPrefix2" value="prefix2" />
                      }
                      label="prefix2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorAfterSuffix5} onChange={handleCRFEntityExtractorAfterChange} name="CRFEntityExtractorAfterSuffix5" value="suffix5" />
                      }
                      label="suffix5"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorAfterSuffix3} onChange={handleCRFEntityExtractorAfterChange} name="CRFEntityExtractorAfterSuffix3" value="suffix3" />
                      }
                      label="suffix3"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorAfterSuffix2} onChange={handleCRFEntityExtractorAfterChange} name="CRFEntityExtractorAfterSuffix2" value="suffix2" />
                      }
                      label="suffix2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorAfterSuffix1} onChange={handleCRFEntityExtractorAfterChange} name="CRFEntityExtractorAfterSuffix1" value="suffix1" />
                      }
                      label="suffix1"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorAfterPos} onChange={handleCRFEntityExtractorAfterChange} name="CRFEntityExtractorAfterPos" value="pos" />
                      }
                      label="pos"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorAfterPos2} onChange={handleCRFEntityExtractorAfterChange} name="CRFEntityExtractorAfterPos2" value="pos2" />
                      }
                      label="pos2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorAfterPattern} onChange={handleCRFEntityExtractorAfterChange} name="CRFEntityExtractorAfterPattern" value="pattern" />
                      }
                      label="pattern"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorAfterBias} onChange={handleCRFEntityExtractorAfterChange} name="CRFEntityExtractorAfterBias" value="bias" />
                      }
                      label="bias"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={CRFEntityExtractorAfterTextDenseFeatures} onChange={handleCRFEntityExtractorAfterChange} name="CRFEntityExtractorAfterTextDenseFeatures" value="text_dense_features" />
                      }
                      label="text_dense_features"
                    />
                  </FormGroup>
                  <FormHelperText>Choose atleast one After Feature</FormHelperText>
                </FormControl>

                <br/><br/>

                <TextField
                  type="number"
                  inputProps={{ CRFEntityExtractorMinMaxIterations }}
                  value={CRFEntityExtractorMaxIterations}
                  onChange={handleCRFEntityExtractorMaxIterationsChange}
                  variant="outlined"
                  label="Max Iterations"
                  className="TokenizerDropDowns"
                />

                <br/><br/>

                <TextField
                  type="number"
                  inputProps={{ CRFEntityExtractorMinL1, CRFEntityExtractorMaxL1, step:".1" }}
                  value={CRFEntityExtractorL1}
                  onChange={handleCRFEntityExtractorL1Change}
                  variant="outlined"
                  label="L1 Regularization Weight"
                  className="TokenizerDropDowns"
                />

                <TextField
                  type="number"
                  inputProps={{ CRFEntityExtractorMinL2, CRFEntityExtractorMaxL2, step:".1" }}
                  value={CRFEntityExtractorL2}
                  onChange={handleCRFEntityExtractorL2Change}
                  variant="outlined"
                  label="L2 Regularization Weight"
                  className="TokenizerDropDowns"
                />

                <br/><br/>
                
                <TextField
                  value={CRFEntityExtractorSplitAddress}
                  onChange={handleCRFEntityExtractorSplitAddressChange}
                  select // tell TextField to render select
                  label="Split Entities by Comma : Address"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value={false}>False</MenuItem>
                  <MenuItem value>True</MenuItem>
                </TextField>

                <TextField
                  value={CRFEntityExtractorSplitEmail}
                  onChange={handleCRFEntityExtractorSplitEmailChange}
                  select // tell TextField to render select
                  label="Split Entities by Comma : Email"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </TextField>
              </div>}
              {ducklingE && 
              <div className='PipelineComponent'>
                DucklingEntityExtractor
                <br/><br/>

                <TextField
                  type="number"
                  inputProps={{ ducklingEntityExtractorMinPortNo, ducklingEntityExtractorMaxPortNo }}
                  value={ducklingEntityExtractorPortNo}
                  onChange={handleDucklingEntityExtractorPortNoChange}
                  variant="outlined"
                  label="Port Number"
                  className="TokenizerDropDowns"
                />

                <br/><br/>

                <FormControl
                  required
                  error={ducklingEntityExtractorDimensionsValuesError}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">Dimensions</FormLabel>
                  <FormGroup
                    className="spacyEntityExtractorFormGroup"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox checked={ducklingEntityExtractorTime} onChange={handleDucklingEntityExtractorDimensionsChange} name="ducklingEntityExtractorTime" value="time" />
                      }
                      label="time"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={ducklingEntityExtractorNumber} onChange={handleDucklingEntityExtractorDimensionsChange} name="ducklingEntityExtractorNumber" value="upper" />
                      }
                      label="upper"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={ducklingEntityExtractorMoney} onChange={handleDucklingEntityExtractorDimensionsChange} name="ducklingEntityExtractorMoney" value="title" />
                      }
                      label="title"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={ducklingEntityExtractorDistance} onChange={handleDucklingEntityExtractorDimensionsChange} name="ducklingEntityExtractorDistance" value="digit" />
                      }
                      label="digit"
                    />
                  </FormGroup>
                  <FormHelperText>Choose atleast one Dimension</FormHelperText>
                </FormControl>

                <br/><br/>

                <TextField
                  type="number"
                  inputProps={{ ducklingEntityExtractorMinTimeout }}
                  value={ducklingEntityExtractorTimeout}
                  onChange={handleDucklingEntityExtractorTimeoutChange}
                  variant="outlined"
                  label="Timeout"
                  className="TokenizerDropDowns"
                />
              </div>}
              {regexE && 
              <div className='PipelineComponent'>
                RegexEntityExtractor
                <br/><br/>
                
                <TextField
                  value={regexEntityExtractorCaseSensitive}
                  onChange={handleRegexEntityExtractorCaseSensitiveChange}
                  select // tell TextField to render select
                  label="Case Sensitive"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value={false}>False</MenuItem>
                  <MenuItem value>True</MenuItem>
                </TextField>

                <br/><br/>
                
                <TextField
                  value={regexEntityExtractorLookupTables}
                  onChange={handleRegexEntityExtractorLookupTablesChange}
                  select // tell TextField to render select
                  label="Use Lookup Tables"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </TextField>

                <br/><br/>
                
                <TextField
                  value={regexEntityExtractorRegexes}
                  onChange={handleRegexEntityExtractorRegexesChange}
                  select // tell TextField to render select
                  label="Use Regexes"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </TextField>

                <br/><br/>
                
                <TextField
                  value={regexEntityExtractorWordBoundaries}
                  onChange={handleRegexEntityExtractorWordBoundariesChange}
                  select // tell TextField to render select
                  label="Use Word Boundaries"
                  className="TokenizerDropDowns"
                >
                  <MenuItem value>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </TextField>
              </div>}
              {entityE && <div className='PipelineComponent'>EntitySynonymMapper</div>}

              <Button 
              variant="contained"
              onClick={trainModel}
              className="trainBtn"
              >
                Train Model
              </Button>
            </div>
          </div>
          <div style={{clear: "both"}}/>
        {/* <Box style={{height: "1000px", width: "300px", backgroundColor: "red"}}> */}
        
        {/* </Box> */}
      </Container>
    </Page>
  );
}
