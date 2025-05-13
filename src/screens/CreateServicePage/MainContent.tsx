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
import { Dropdown, DropdownItem } from "../../components/Dropdown/Dropdown";
import { IconButton } from "../../components/IconButton/IconButton.tsx";
import { Input } from "../../components/Input/Input.tsx";
import { Link } from "../../components/Link/Link.tsx";
import { Radio } from "../../components/Radio/Radio";
import { TagsInput } from "../../components/TagsInput/TagsInput.tsx";
import { vars } from "../../styles/theme.css.ts";
import type { ColumnDefinition } from "./InteractiveDataTable.tsx";
import { InteractiveDataTable } from "./InteractiveDataTable.tsx";
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
              className="AvatarIcon"
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
  <svg
    viewBox="0 0 20 20"
    width="16px"
    height="16px"
    fill="currentColor"
    aria-hidden="true"
  >
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
          <div className="ServiceCard-priceValue">$99.99</div>
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
  const [selectedVersion, setSelectedVersion] = useState("Oracle 21c");
  const [selectedRelease, setSelectedRelease] = useState("");
  const [isVersionOpen, setIsVersionOpen] = useState(false);

  const handleReleaseSelect = (version: { value: string; label: string }) => {
    setSelectedVersion(version.label);
  };

  const handleVersionSelect = (version: { value: string; label: string }) => {
    setSelectedRelease(version.label);
    setIsVersionOpen(false);
  };

  const oracleVersions = [
    { value: "21c", label: "Oracle 21c" },
    { value: "19c", label: "Oracle 19c" },
    { value: "18c", label: "Oracle 18c" },
    { value: "12c", label: "Oracle 12c" },
  ];

  const versionOptions = [
    { value: "21.3.0.0.0", label: "21.3.0.0.0" },
    { value: "19.18.0.0.0", label: "19.18.0.0.0" },
    { value: "18.17.0.0.0", label: "18.17.0.0.0" },
    { value: "12.2.0.1.0", label: "12.2.0.1.0" },
  ];

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
          <div className="ServiceDetailsTagContainer-heading">Service Name</div>
          <Input
            placeholder="Enter service name"
            size="regular"
            trailingItem={<CheckIcon />}
            wrapperClassName="ServiceDetailsForm-input"
          />
        </div>
        <div className="ServiceDetailsFormDescription">
          <div className="ServiceDetailsTagContainer-heading">
            Description (optional)
          </div>
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
          <TagsInput
            initialTags={[
              {
                id: "1",
                keyText: "key_input",
                valueText: "value_input",
              },
              {
                id: "2",
                keyText: "key2",
                valueText: "value2",
              },
            ]}
          />
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
            <Dropdown
              trigger={(props) => (
                <div style={{ position: "relative", width: "100%" }}>
                  <Input
                    size="regular"
                    wrapperClassName="EngineConfigurationContainer-input"
                    trailingItem={
                      <div
                        onClick={props.onClick}
                        style={{ cursor: "pointer" }}
                      >
                        <ChevronDownIcon />
                      </div>
                    }
                    value={selectedVersion}
                    onChange={(e) => setSelectedVersion(e.target.value)}
                    onClick={props.onClick}
                    aria-expanded={props["aria-expanded"]}
                    aria-haspopup={props["aria-haspopup"]}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              )}
              panelStyle={{
                minWidth: "360px",
                // position: "relative",
              }}
            >
              {oracleVersions.map((version) => (
                <DropdownItem
                  key={version.value}
                  value={version.value}
                  onSelect={() => {
                    handleReleaseSelect(version);
                  }}
                >
                  {version.label}
                </DropdownItem>
              ))}
            </Dropdown>
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
            <Dropdown
              initialOpen={isVersionOpen}
              trigger={(props) => (
                <div style={{ position: "relative", width: "100%" }}>
                  <Input
                    size="regular"
                    wrapperClassName="EngineConfigurationContainer-input"
                    trailingItem={
                      <div
                        onClick={props.onClick}
                        style={{ cursor: "pointer" }}
                      >
                        <ChevronDownIcon />
                      </div>
                    }
                    value={selectedRelease}
                    onChange={(e) => setSelectedRelease(e.target.value)}
                    onClick={props.onClick}
                    aria-expanded={props["aria-expanded"]}
                    aria-haspopup={props["aria-haspopup"]}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              )}
              panelStyle={{
                minWidth: "360px",
              }}
              onOpenChange={setIsVersionOpen}
            >
              {versionOptions.map((version) => (
                <DropdownItem
                  key={version.value}
                  value={version.value}
                  onSelect={() => handleVersionSelect(version)}
                >
                  {version.label}
                </DropdownItem>
              ))}
            </Dropdown>
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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M13 2H11V1H10V2H6V1H5V2H3C2.45 2 2 2.45 2 3V13C2 13.55 2.45 14 3 14H13C13.55 14 14 13.55 14 13V3C14 2.45 13.55 2 13 2ZM13 13H3V6H13V13ZM13 5H3V3H5V4H6V3H10V4H11V3H13V5Z"
      fill="#1A2031"
    />
  </svg>
);
const TimeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M8 15C6.61553 15 5.26216 14.5895 4.11101 13.8203C2.95987 13.0511 2.06266 11.9579 1.53285 10.6788C1.00303 9.3997 0.86441 7.99224 1.13451 6.63437C1.4046 5.2765 2.07129 4.02922 3.05026 3.05026C4.02922 2.07129 5.2765 1.4046 6.63437 1.13451C7.99224 0.86441 9.3997 1.00303 10.6788 1.53285C11.9579 2.06266 13.0511 2.95987 13.8203 4.11101C14.5895 5.26216 15 6.61553 15 8C15 9.85652 14.2625 11.637 12.9497 12.9497C11.637 14.2625 9.85652 15 8 15ZM8 2C6.81332 2 5.65328 2.3519 4.66658 3.01119C3.67989 3.67047 2.91085 4.60755 2.45673 5.7039C2.0026 6.80026 1.88378 8.00666 2.11529 9.17054C2.3468 10.3344 2.91825 11.4035 3.75736 12.2426C4.59648 13.0818 5.66558 13.6532 6.82946 13.8847C7.99335 14.1162 9.19975 13.9974 10.2961 13.5433C11.3925 13.0892 12.3295 12.3201 12.9888 11.3334C13.6481 10.3467 14 9.18669 14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2Z"
      fill="#1A2031"
    />
    <path
      d="M10.295 11L7.5 8.205V3.5H8.5V7.79L11 10.295L10.295 11Z"
      fill="#1A2031"
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

export const AdditionalSettingsSection = () => {
  // For a static display, state isn't strictly needed.
  // If this were interactive, you'd use useState for radio selections, checkbox, etc.
  const [windowPreference, setWindowPreference] = useState("noPreference");
  const [autoMinorVersion, setAutoMinorVersion] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState("0.5");
  const [isDurationOpen, setIsDurationOpen] = useState(false);

  const durationOptions = [
    { value: "0.5", label: "0.5" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];

  const handleDurationSelect = (duration: { value: string; label: string }) => {
    setSelectedDuration(duration.label);
    setIsDurationOpen(false);
  };

  // Table data would come from props or state in a real app
  const initialTableData = [
    { id: "r1", linkText: "Link1", rowTitle: "Row Title 4" },
    { id: "r2", linkText: "Link2", rowTitle: "Row Title 3" },
    { id: "r3", linkText: "Link3", rowTitle: "Row Title 2" },
    { id: "r4", linkText: "Link4", rowTitle: "Row Title 1" },
  ];
  const [tableData, setTableData] = useState(initialTableData);

  const handleDeleteRow = (rowId: string) => {
    console.log("rowId", rowId);
    setTableData((prevData) => prevData.filter((row) => row.id !== rowId));
  };

  const tableColumns: ColumnDefinition[] = [
    // Select column implicitly handled by InteractiveDataTable if configured
    {
      id: "select",
      header: "",
      cell: () => null,
      isSelectionCell: true,
      headerAlign: "center",
    }, // Placeholder, InteractiveDataTable handles Checkbox
    {
      id: "linkText",
      header: <>Header</>,
      cell: (row) => (
        <Link href="#" colorVariant="primary">
          {row.linkText}
        </Link>
      ),
      isSortable: true,
      align: "left",
    },
    {
      id: "rowTitle",
      header: <>Header</>,
      cell: (row) => row.rowTitle,
      isSortable: true,
      align: "left",
    },
    {
      id: "actions",
      header: <>Header</>,
      //@ts-ignore
      cell: () => null,
      align: "right",
      isSortable: true,
    }, // Actions will be handled by InteractiveDataTable's 'actions' column if defined there
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
      </div>
      <div className="SettingsBlock SettingsBlock-maintenanceWindow">
        <div className="FieldGroup">
          <span className="FieldLabel">Window Preference</span>
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
              className="Input-maintenanceWindow"
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
              className="Input-maintenanceWindow"
            />
          </div>
        </div>

        <div className="FieldGroup">
          <Dropdown
            initialOpen={isDurationOpen}
            trigger={(props) => (
              <div style={{ position: "relative", width: "100%" }}>
                <Input
                  id="duration"
                  label="Duration"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  trailingItem={
                    <div onClick={props.onClick} style={{ cursor: "pointer" }}>
                      <ChevronDownIcon />
                    </div>
                  }
                  onClick={props.onClick}
                  aria-expanded={props["aria-expanded"]}
                  aria-haspopup={props["aria-haspopup"]}
                  size="regular"
                  className="Input-maintenanceWindow"
                  style={{ cursor: "pointer" }}
                />
              </div>
            )}
            panelStyle={{
              minWidth: "360px",
            }}
            onOpenChange={setIsDurationOpen}
          >
            {durationOptions.map((duration) => (
              <DropdownItem
                key={duration.value}
                value={duration.value}
                onSelect={() => handleDurationSelect(duration)}
              >
                {duration.label}
              </DropdownItem>
            ))}
          </Dropdown>
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
      </div>
      <div
        className="SettingsBlock"
        style={{
          width: "100%",
        }}
      >
        <div className="HorizontalFieldGroup">
          <div className="FieldWrapper">
            <Input
              id="sla"
              label="SLA"
              defaultValue="Dev-QA-SLA"
              size="regular"
              className="Input-availabilityMachine"
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
              className="Input-availabilityMachine"
            />
          </div>
        </div>

        <div className="SettingsTableContainer">
          <InteractiveDataTable
            columns={tableColumns}
            data={tableData}
            onRowDelete={handleDeleteRow}
          />
        </div>
      </div>

      <div className="AlertMessage">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flex: "1 0 0",
          }}
        >
          <span className="AlertMessage-icon">
            <InfoIcon />
          </span>
          <span className="AlertMessage-text">
            Projecting an estimate total count of 71 snapshots with the above
            configuration.
          </span>
        </div>
        <button className="AlertMessage-closeButton" aria-label="Dismiss alert">
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
