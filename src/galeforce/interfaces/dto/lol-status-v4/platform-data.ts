/*
    The PlatformDataInterface is an interface for status data returned from V4 endpoints.
*/

enum MaintenanceStatus {
    SCHEDULED = 'scheduled',
    IN_PROGRESS = 'in_progress',
    COMPLETE = 'complete',
}

enum IncidentSeverity {
    INFO = 'info',
    WARNING = 'warning',
    CRITICAL = 'critical',
}

enum Platform {
    WINDOWS = 'windows',
    MACOS = 'macos',
    ANDROID = 'android',
    IOS = 'ios',
    PS4 = 'ps4',
    XBONE = 'xbone',
    SWITCH = 'switch',
}
 
enum PublishLocations {
    RIOT_CLIENT = 'riotclient',
    RIOT_STATUS = 'riotstatus',
    GAME = 'game',
}

interface ContentInterface {
    locale: string;
    content: string;
}

interface UpdateInterface {
    id: number;
    author: string;
    publish: boolean;
    publish_locations: PublishLocations[]; // (Legal values: riotclient, riotstatus, game)
    translations: ContentInterface[];
    created_at: string;
    updated_at: string;
}

interface StatusInterface {
    id: number;
    maintenance_status: MaintenanceStatus | null; // (Legal values: scheduled, in_progress, complete)
    incident_severity: IncidentSeverity; // (Legal values: info, warning, critical)
    titles: ContentInterface[];
    updates: UpdateInterface[];
    created_at: string;
    archive_at: string | null;
    updated_at: string | null;
    platforms: Platform[]; // (Legal values: windows, macos, android, ios, ps4, xbone, switch)

}

export interface PlatformDataInterface {
    id: string;
    name: string;
    locales: string[];
    maintenances: StatusInterface[];
    incidents: StatusInterface[];
}