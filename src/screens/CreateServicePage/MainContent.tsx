import { useState } from "react";

import {
  AvatarIcon,
  BellIcon,
  ChevronDownIcon,
  CodeIcon,
  HelpIcon,
  InfoIcon,
  SpeakerIcon,
  UnionIcon,
} from "../../assets/svg/index.ts";
import { Button } from "../../components/Button/Button.tsx";
import { Checkbox } from "../../components/Checkbox/Checkbox.tsx";
import { IconButton } from "../../components/IconButton/IconButton.tsx";
import { Input } from "../../components/Input/Input.tsx";
import { Link } from "../../components/Link/Link.tsx";
import { Radio } from "../../components/Radio/Radio";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../../components/Table"; // Assuming TableComponents.tsx is indexed
import { TagsInput } from "../../components/TagsInput/TagsInput.tsx";
import { vars } from "../../styles/theme.css.ts";
import "./MainContent.css";
import { mainContentContainer } from "./MainContent.css.ts";
const Header = () => {
  return (
    <>
      <div className="HeaderContainer">
        <div className="HeaderContainer-top">
          <div className="HeaderContainer-top-left">
            <span>Provisioning</span>
            <span>/</span>
            <span>Relational Databases</span>
            <span>/</span>
            <span>Oracle Server</span>
          </div>
          <div className="HeaderContainer-top-right">
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <span>Credits: $365</span>
            </div>

            <span
              style={{
                width: "0.0625rem",
                height: "1.25rem",
                background: vars.colors.surface200,
              }}
            ></span>
            <IconButton
              icon={<SpeakerIcon />}
              aria-label={"Speaker"}
              size="20px"
            />
            <IconButton icon={<HelpIcon />} aria-label={"Help"} size="20px" />
            <IconButton icon={<BellIcon />} aria-label={"Bell"} size="20px" />
            <IconButton
              icon={<AvatarIcon />}
              aria-label={"Avatar"}
              size="20px"
            />
          </div>
        </div>
        <div className="HeaderContainer-bottom">
          <span className="HeaderHeading">
            Create New Oracle Database Service
          </span>

          <div className="HeaderContainer-bottom-right">
            <div
              style={{
                color: "#0942B3",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CodeIcon />
              <span>Code</span>
            </div>
            <IconButton icon={<UnionIcon />} aria-label={"Close"} size="16px" />
          </div>
        </div>
      </div>
    </>
  );
};
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M6.5 12L2 7.5L2.707 6.793L6.5 10.5855L13.293 3.793L14 4.5L6.5 12Z"
      fill="#1A2031"
    />
  </svg>
);
/* ───────────────────── Icons ───────────────────── */
const PlusIcon = () => (
  <svg viewBox="0 0 20 20" width="1em" height="1em" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
      clipRule="evenodd"
    />
  </svg>
);

const OracleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="10"
    viewBox="0 0 16 10"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M5.29561 9.56825C2.71278 9.56825 0.666687 7.50045 0.666687 4.99995C0.666687 2.45094 2.76192 0.431641 5.29561 0.431641H10.7044C13.2873 0.431641 15.3334 2.49944 15.3334 4.99995C15.3334 7.54896 13.2381 9.56825 10.7044 9.56825H5.29561ZM10.6068 7.93316C11.4066 7.92847 12.1723 7.61282 12.7379 7.05465C13.3035 6.49649 13.6233 5.7408 13.6281 4.95144C13.6233 4.16209 13.3035 3.4064 12.7379 2.84823C12.1723 2.29006 11.4066 1.97441 10.6068 1.96973H5.44176C4.64193 1.97441 3.87621 2.29006 3.31064 2.84823C2.74507 3.4064 2.42523 4.16209 2.42048 4.95144C2.42523 5.7408 2.74507 6.49649 3.31064 7.05465C3.87621 7.61282 4.64193 7.92847 5.44176 7.93316H10.6068Z"
      fill="#B21C1C"
    />
  </svg>
);

/* ───────────────────── Step-per bits ───────────────────── */
interface StepIndicatorProps {
  isActive: boolean;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ isActive }) => (
  <div
    className={
      isActive
        ? "ServiceCard-stepIndicator ServiceCard-stepIndicator--active"
        : "ServiceCard-stepIndicator ServiceCard-stepIndicator--inactive"
    }
  />
);

const StepLine = () => <div className="ServiceCard-stepLine" />;
const LineBreak = () => (
  <span
    style={{
      width: 1,
      height: 10,
      background: vars.colors.surface400,
    }}
  ></span>
);

/* ───────────────────── Main component ───────────────────── */
export const ServiceCard: React.FC = () => {
  return (
    <div className="ServiceCard">
      {/* ─────────────── Upper part (grid) ─────────────── */}
      <div className="ServiceCard-topGrid">
        {/* left column – vertical step-per */}
        <div
          className="ServiceCard-stepper"
          style={{
            height: "102.6px",
            paddingTop: "15.5px",
          }}
        >
          <StepIndicator isActive={true} />
          <StepLine />
          <StepIndicator isActive={false} />
        </div>

        {/* right column – all headings & text */}
        <div>
          <div className="TopSection">
            <h3 className="ServiceCard-heading">Service Details</h3>
            <div className="ServiceCard-description">
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span>Oracle_service</span>
                <OracleIcon />
                <LineBreak />
              </div>
              <span>oracle_para_profile</span>
            </div>
          </div>
          <div>
            <h3
              className="ServiceCard-heading"
              style={{ marginTop: 24, color: vars.colors.textPrimary }}
            >
              Additional Setting
            </h3>
            <div className="ServiceCard-description">
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span>No Preference</span>
                <span>Enabled minor version update</span>
                <LineBreak />
              </div>
              <span>7-day 01:00 snapshot time</span>
              <LineBreak />
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────── Bottom part ─────────────── */}
      <div className="ServiceCard-bottom">
        <div className="ServiceCard-priceRow">
          <div className="ServiceCard-priceInfo">
            <span className="ServiceCard-priceLabel">
              Estimated Monthly Price*
            </span>
            {/* <a className="ServiceCard-viewLink">View details</a> */}
            <Link href="/">View Details</Link>
          </div>
          <span className="ServiceCard-priceValue">$99.99</span>
        </div>

        <Button buttonType="primary" size="large" iconBefore={<PlusIcon />}>
          Create service
        </Button>
      </div>
    </div>
  );
};
const ServiceDetails = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="ServiceDetails">
      <div className="ServiceDetails-headingContainer">
        <h3 className="ServiceDetails-heading">Service Details</h3>
        <p className="ServiceDetails-description">
          Service Name, Service Description, Software Release, etc.
        </p>
      </div>
      <div className="ServiceDetailsFormContainer">
        <div className="ServiceDetailsForm">
          <div>Service Name</div>
          <Input
            placeholder="Enter service name"
            size="regular"
            trailingItem={<CheckIcon />}
            wrapperClassName="ServiceDetailsForm-input"
          />
        </div>
        <div className="ServiceDetailsFormDescription">
          <div>Description (optional)</div>
          <Input
            // placeholder="Enter service description"
            textareaProps={{
              //@ts-ignore
              placeholder: "Add a description",
            }}
            size="regular"
            wrapperClassName="ServiceDetailsForm-description-input"
            className="ServiceDetailsForm-description-input-textarea"
            isTextArea={true}
          />
        </div>
        <div className="ServiceDetailsTagContainer">
          <div className="ServiceDetailsTagContainer-heading">Tags</div>
          <TagsInput />
        </div>
      </div>
      <div className="EngineConfigurationContainer">
        <div className="EngineConfigurationContainer-headingContainer">
          <div className="EnginerConfiguration-heading">
            Engine configuration
          </div>
          <div className="EngineConfigurationContainer-description">
            Adjustable parameters, performance optimization, fine-tuning options
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <div className="InputHeading">Software Release</div>
            <Input
              // placeholder="Oracle 21c"
              size="regular"
              wrapperClassName="EngineConfigurationContainer-input"
              trailingItem={<ChevronDownIcon />}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <div className="InputHeading">Version</div>
            <Input
              size="regular"
              wrapperClassName="EngineConfigurationContainer-input"
              trailingItem={<ChevronDownIcon />}
            />
          </div>
        </div>
      </div>
      <div className="ContainerCheckbox">
        <Checkbox defaultChecked={isChecked} onCheckedChange={setIsChecked} />
        <div className="ContainerCheckbox-description">
          Create as a Container Database
        </div>
      </div>
    </div>
  );
};

const ServiceContainer = () => {
  return (
    <div className="ServiceContainer">
      <ServiceCard />
      <div className="ServiceContainer-main">
        <ServiceDetails />
        <AdditionalSettingsSection />
      </div>
    </div>
  );
};

export const MainContent = () => {
  return (
    <div className={mainContentContainer}>
      <Header />
      <ServiceContainer />
    </div>
  );
};
const CalendarIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
);
const TimeIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V5z"
      clipRule="evenodd"
    />
  </svg>
);
const CloseIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path d="M7 6H6V12H7V6Z" fill="#0942B3" />
    <path d="M10 6H9V12H10V6Z" fill="#0942B3" />
    <path
      d="M2 3V4H3V14C3 14.2652 3.10536 14.5196 3.29289 14.7071C3.48043 14.8946 3.73478 15 4 15H12C12.2652 15 12.5196 14.8946 12.7071 14.7071C12.8946 14.5196 13 14.2652 13 14V4H14V3H2ZM4 14V4H12V14H4Z"
      fill="#0942B3"
    />
    <path d="M10 1H6V2H10V1Z" fill="#0942B3" />
  </svg>
);
export const AdditionalSettingsSection = () => {
  // For a static display, state isn't strictly needed.
  // If this were interactive, you'd use useState for radio selections, checkbox, etc.
  const [windowPreference, setWindowPreference] = useState("noPreference");
  const [autoMinorVersion, setAutoMinorVersion] = useState(true);

  // Table data would come from props or state in a real app
  const tableData = [
    { id: "r1", linkText: "Link", rowTitle: "Row Title" },
    { id: "r2", linkText: "Link", rowTitle: "Row Title" },
    { id: "r3", linkText: "Link", rowTitle: "Row Title" },
    { id: "r4", linkText: "Link", rowTitle: "Row Title" },
  ];

  return (
    <div className="AdditionalSettingsSection">
      <div className="SettingsBlock">
        <h3 className="BlockTitle">Additional settings</h3>
        <p className="BlockDesc1">Maintenance Window, Availability machine</p>
      </div>

      <div className="SettingsBlock">
        <h4 className="BlockWindow">Maintenance Window</h4>
        <p className="BlockDesc2">Describing what maintenance window is</p>

        <div className="FieldGroup">
          {/* <span className="FieldLabel">Window Preference</span> */}
          <div className="RadioGroup">
            <Radio
              name="windowPreference"
              value="noPreference"
              label="No Preferences"
              checked={windowPreference === "noPreference"}
              onCheckedChange={() => setWindowPreference("noPreference")}
              size="small"
            />
            <Radio
              name="windowPreference"
              value="selectWindow"
              label="Select Window"
              checked={windowPreference === "selectWindow"}
              onCheckedChange={() => setWindowPreference("selectWindow")}
              size="small"
            />
          </div>
        </div>

        <div className="HorizontalFieldGroup">
          <div className="FieldWrapper">
            <Input
              id="startDay"
              label="Start day"
              defaultValue="Sunday"
              readOnly // Assuming this acts like a select trigger
              trailingItem={<CalendarIcon />}
              size="regular" // Or your default input size
            />
          </div>
          <div className="FieldWrapper">
            <Input
              id="startTime"
              label="Start time"
              defaultValue="04:00"
              readOnly
              trailingItem={<TimeIcon />}
              size="regular"
            />
          </div>
        </div>

        <div className="FieldGroup" style={{ marginTop: "16px" }}>
          <Input
            id="duration"
            label="Duration"
            defaultValue="0.5"
            readOnly
            trailingItem={<ChevronDownIcon />}
            size="regular"
          />
        </div>

        <div className="EnableAutoMinorVersionCheckbox">
          <Checkbox
            id="autoMinorVersion"
            label="Enable auto minor version update"
            checked={autoMinorVersion}
            onCheckedChange={setAutoMinorVersion}
          />
        </div>
      </div>

      <div className="SettingsBlock">
        <h3 className="BlockWindow">Availability Machine Preferences</h3>
        <p className="BlockDesc3">
          Here you can define your data protection SLA and schedule. Once the
          database has been created, you can further define the data
          availability and access policies from the Availability Machine app.
        </p>

        <div className="HorizontalFieldGroup">
          <div className="FieldWrapper">
            <Input
              id="sla"
              label="SLA"
              defaultValue="Dev-QA-SLA"
              size="regular"
            />
          </div>
          <div className="FieldWrapper">
            <Input
              id="snapshotTimeAvail" /* Different ID from other Start time */
              label="Snapshot time"
              defaultValue="04:00"
              readOnly
              trailingItem={<TimeIcon />}
              size="regular"
            />
          </div>
        </div>

        <div className="SettingsTableContainer">
          <Table wrapperClassName="SettingsTable">
            <TableHeader>
              <TableRow isHeaderRow>
                <TableHeaderCell isSelectionCell size="compact" align="left">
                  <Checkbox
                    aria-label="Select all table items"
                    size="small"
                    className="SettingsTable-checkbox"
                  />
                </TableHeaderCell>
                <TableHeaderCell size="compact" isSortable align="left">
                  Header
                </TableHeaderCell>
                <TableHeaderCell size="compact" isSortable align="left">
                  Header
                </TableHeaderCell>
                <TableHeaderCell size="compact" align="right" isSortable>
                  Header
                </TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
                <TableRow
                  key={
                    row.id
                  } /* isSelected={...} isSpecActiveOrFocused={...} */
                >
                  <TableCell isSelectionCell size="compact">
                    <Checkbox
                      aria-label={`Select ${row.linkText}`}
                      size="small"
                      className="SettingsTable-checkbox"
                    />
                  </TableCell>
                  <TableCell size="compact" align="left">
                    <Link href="#" colorVariant="primary">
                      {row.linkText}
                    </Link>
                  </TableCell>
                  <TableCell size="compact">{row.rowTitle}</TableCell>
                  <TableCell size="compact" align="right">
                    <Button
                      aria-label={`Delete ${row.rowTitle}`}
                      iconBefore={<TrashIcon />}
                      buttonType="tertiary"
                      size="small"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="AlertMessage">
        <span className="AlertMessage-icon">
          <InfoIcon />
        </span>
        <span className="AlertMessage-text">
          Projecting an estimate total count of 71 snapshots with the above
          configuration.
        </span>
        <button className="AlertMessage-closeButton" aria-label="Dismiss alert">
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
