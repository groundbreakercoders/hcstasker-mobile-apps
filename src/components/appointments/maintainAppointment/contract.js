import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Picker, TouchableOpacity, TextInput,Text,StyleSheet, TouchableHighlight, Modal, Keyboard,Alert, Dimensions, StatusBar, YellowBox, Platform} from "react-native";
import {
  Item,
  Input,
  Button,
  Grid,
  Col,
  View,
  Spinner,
  Icon,
  ListItem,
  Container,
  Content
} from "native-base";
import PropTypes from "prop-types";
import _ from "lodash";
import ModalDropdown from "react-native-modal-dropdown";
import AppointmentActions from "../../../Redux/appointmentstore";
import Header from "../../common/header";
import MIcon from "../../common/mIcon";
import RenderTag from "../../common/renderSubCategories";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import styles from "./styles";
import firebase from "react-native-firebase";
import data from "../../../utils/data";
import {RadioGroup, RadioButton, Radio} from "radio-react-native";
import DatePickerCustom from "../../common/datePicker";
const { height, width } = Dimensions.get("window");
import moment from "moment";
import DatePicker from "react-native-datepicker";
import MapInput from '../../common/maps';
import RNPickerSelect from 'react-native-picker-select';
import CustomModal from "../../common/modal";
import platform from "../../../../native-base-theme/variables/platform";
import Pdf from 'react-native-pdf';
class Contract extends Component {

  constructor(props) {
      super(props);

      this.inputRefs = {
        relationship: null,
      };

      const validate = ({ patientName }) => {
        const errors = {}
        if (patientName.trim() == null){
          errors.patientName = 'Must not be blank'
        }
        return errors;
      };

        let isEditable;
        let isDisabled;
        if(props.appointment && (props.appointment.status === 'Under Review' ||
            props.appointment.status === 'Service Requested')) {
            isEditable=true;
            isDisabled=false;
        } else {
            isEditable=false;
            isDisabled=true;

        }

      if(props.appointment) {
          this.state = {
            loading: true,
            data: null,
            cost: "",
            appointment:props.appointment,
            isEditMode: isEditable,
           isDisabled: isDisabled
          };
        } else {
          this.state = {
            loading: true,
            data: null,
            cost: "",
            appointment:{},
            isEditMode: isEditable,
            isDisabled: isDisabled,
            relationship:undefined,
            serviceType:undefined
          };
      }
  }

  componentDidMount() {
  }




  render() {
    const { strings } = this.props;
    const resources = {
      file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
      url: 'https://www.ets.org/Media/Tests/TOEFL/pdf/SampleQuestions.pdf',
      base64: 'JVBERi0xLjMKJcfs...',
    };
    const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};

    const resourceType = 'base64';
    return (
      <Container>
        <CustomModal strings={strings} />
        <Content scrollEnabled={false}>
        <View
            style={{
              flex: 1,
              height: Platform.OS === "ios" ? height - 55 : height - 75,
              backgroundColor: "#fff"
            }}
          >
            <View style={{ flex: 1, flexDirection: "column" }}>
              <View style={{ flex: 6, marginTop:10, marginLeft:10, marginRight:10,
                borderWidth: 1,borderColor: 'black', shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 6,
                }}>
                
              </View>
              <View
              style={{
                flex: Platform.OS === "ios"
                    ? 0.6
                    : 1.1
                  }}

                  >
            <View
              style={{
                flex: Platform.OS === "ios" ? 1.7 : 1.9,
                alignSelf: "center",
                justifyContent: "center",
                flexDirection: 'row',
              }}
            >
            <View style={styles.containerbtn}>
              <View style={styles.buttonContainer}>
                  <Button
                  bordered
                  style={styles.acceptButton}
                  >
                  <Text style={{ fontSize: 18,
                  color: "#fff",
                  fontWeight: "500",
                  fontWeight: "bold"

                  }}>
                  {this.props.strings.accept}
                  </Text>
              </Button>

              </View>
              <View style={styles.buttonContainer}>
              <Button
            bordered
            style={styles.declineButton}
          >
            <Text style={{ fontSize: 18,
            color: "#fff",
            fontWeight: "500",
            fontWeight: "bold"

            }}>
            {this.props.strings.decline}
            </Text>
        </Button>
              </View>
            </View>



          </View>
          </View>
          </View>
          </View>
        </Content>
      </Container>
    );
  }
}


const mapStateToProps = state => ({
  email: state.user.email,
  isAddressClicked:false
});


const bindActions = dispatch => ({
  saveAppointment: (appointment) =>
    dispatch(AppointmentActions.saveAppointment(appointment))
});

export default connect(
  mapStateToProps,
  bindActions
)(Contract);
