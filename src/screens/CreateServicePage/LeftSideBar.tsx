import { useState, type CSSProperties } from "react";
import {
  SideBarBottom,
  sidebarContainer,
  SideBarHeader,
  SideBarMenu,
  SideBarTop,
} from "./LeftSideBar.css";
import {
  AppIcon,
  AvailibilityMachines,
  BenchmarkIcon,
  BookIcon,
  ChevronDownIcon,
  DataFlixIcon,
  DbProvisioningIcon,
  DbServicesIcon,
  Logo,
  PinIcon,
  PlusIcon,
  ScriptIcon,
  ServerIcon,
  SidebarIcon,
} from "../../assets/svg";
import { IconButton } from "../../components/IconButton";
import { vars } from "../../styles/theme.css";

const MenuItem = ({
  label,
  Icon,
  sx,
}: {
  label: string;
  Icon: React.ComponentType | string;
  sx: CSSProperties;
}) => (
  <div
    style={{
      display: "flex",
      padding: "6px 8px",
      alignItems: "center",
      gap: "10px",
      alignSelf: "stretch",
      width: "100%",
      borderRadius: vars.radii.sm,
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
      ...sx,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = vars.colors.surface100;
      e.currentTarget.style.color = vars.colors.primary200;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.color = sx.color || vars.colors.textSubtler;
    }}
  >
    {typeof Icon === "string" ? Icon : <Icon />}
    <span>{label}</span>
  </div>
);
export const LeftSideBar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const paths = [
    {
      label: "My Services",
      icon: DbServicesIcon,
      selected: true,
    },
    {
      label: "Provisioning",
      icon: DbProvisioningIcon,
      selected: false,
    },
    {
      label: "Availibility Machines",
      icon: AvailibilityMachines,
      selected: false,
    },
    {
      label: "Dataflix",
      icon: DataFlixIcon,
      selected: false,
    },
    {
      label: "ScriptLibrary",
      icon: ScriptIcon,
      selected: false,
    },
    {
      label: "Benchmarks",
      icon: BenchmarkIcon,
      selected: false,
    },
    {
      label: "Servers",
      icon: ServerIcon,
      selected: false,
    },
  ];

  if (isHidden) {
    return (
      <div className={sidebarContainer}>
        <IconButton
          icon={<SidebarIcon />}
          onClick={() => setIsHidden(!isHidden)}
          aria-label="Toggle Sidebar"
        />
      </div>
    );
  }
  return (
    <div className={sidebarContainer}>
      <div className={SideBarTop}>
        <div className={SideBarHeader}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2.896px",
            }}
          >
            <Logo />
            <span
              style={{
                fontSize: "13.755px",
                color: "#11567F",
                fontWeight: "600",
              }}
            >
              Tessel
            </span>
          </div>
          <IconButton
            icon={<SidebarIcon />}
            // onClick={() => setIsHidden(!isHidden)}
            aria-label="Toggle Sidebar"
          />
        </div>
        <div className={SideBarMenu}>
          <MenuItem
            label="Apps"
            Icon={AppIcon}
            sx={{
              fontSize: vars.fontSize.headingForm,
              fontWeight: 500,
              lineHeight: vars.lineHeight.fontLhsm,
              color: vars.colors.textSubtler,
            }}
          />
          <div
            style={{
              padding: `${vars.spacing.xxs} ${vars.spacing.xxs} ${vars.spacing.xxs} ${vars.spacing.sm}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: vars.radii.md,
              border: `1px solid ${vars.colors.surface200}`,
              fontSize: vars.fontSize.headingSmBodyPrimary,
              fontWeight: vars.fontWeight.mediumEmphasis,
              color: vars.colors.textPrimary,
              width: "100%",
            }}
          >
            <span>DB Services</span>
            <ChevronDownIcon />
          </div>
          {paths.map((path) => (
            <MenuItem
              key={path.label}
              label={path.label}
              Icon={path.icon}
              sx={{
                fontSize: vars.fontSize.headingSmBodyPrimary,
                fontWeight: vars.fontWeight.regular,
                lineHeight: vars.lineHeight.fontLhRegular,
                letterSpacing: "0px",
                color: vars.colors.textSubtler,
                ...(path.selected && {
                  color: vars.colors.primary200,
                }),
              }}
            />
          ))}
        </div>
      </div>
      <div className={SideBarBottom}>
        <div
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              padding: "6px 8px",
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
              }}
            >
              <PlusIcon />
              <span>Invite People</span>
            </div>
            <div>
              <PinIcon />
            </div>
          </div>
        </div>

        <div
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              padding: "6px 8px",
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
              }}
            >
              <BookIcon />
              <span>Help & Support</span>
            </div>
            <div>
              <PinIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
