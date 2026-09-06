export const MAX_RELEASE_DRAFT_BYTES = 1024 * 1024;
export const MAX_RELEASE_DRAFT_TRACKS = 100;

export type ReleaseType = "Single" | "EP" | "Album";

export type TrackMetadata = {
  title: string;
  version: string;
  artists: string;
  songwriters: string;
  explicit: "No" | "Yes" | "Clean version";
  isrc: string;
};

export type ReleaseIdentity = {
  releaseTitle: string;
  primaryArtist: string;
  contactEmail: string;
  releaseType: ReleaseType;
  labelName: string;
  genre: string;
  language: string;
  targetDate: string;
  upc: string;
  artistLink: string;
  notes: string;
};

export const RELEASE_FIELD_NAMES = [
  "releaseTitle",
  "primaryArtist",
  "contactEmail",
  "releaseType",
  "labelName",
  "genre",
  "language",
  "targetDate",
  "upc",
  "artistLink",
  "notes",
] as const satisfies readonly (keyof ReleaseIdentity)[];

export type ReleaseDraft = {
  kind: "navasound-release-draft";
  version: 1;
  release: ReleaseIdentity;
  tracks: TrackMetadata[];
};

const INVALID_DRAFT_MESSAGE =
  "This file is not a supported NavaSound draft. Choose a draft saved from this release workspace.";

const RELEASE_TEXT_LIMITS = {
  releaseTitle: 200,
  primaryArtist: 160,
  contactEmail: 254,
  labelName: 160,
  genre: 100,
  language: 100,
  targetDate: 10,
  upc: 14,
  artistLink: 2048,
  notes: 4000,
} as const;

const TRACK_TEXT_LIMITS = {
  title: 200,
  version: 120,
  artists: 500,
  songwriters: 1000,
  isrc: 15,
} as const;

function invalidDraft(): never {
  throw new Error(INVALID_DRAFT_MESSAGE);
}

function exactRecord(value: unknown, keys: readonly string[]): Record<string, unknown> {
  if (
    value === null ||
    typeof value !== "object" ||
    Object.getPrototypeOf(value) !== Object.prototype
  ) {
    return invalidDraft();
  }

  const ownKeys = Reflect.ownKeys(value);
  if (
    ownKeys.length !== keys.length ||
    ownKeys.some((key) => typeof key !== "string" || !keys.includes(key))
  ) {
    return invalidDraft();
  }

  // Read only own data properties; accessors and inherited fields are not draft data.
  for (const key of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor || !("value" in descriptor)) return invalidDraft();
  }
  return value as Record<string, unknown>;
}

function textField(value: unknown, limit: number, allowMultiline = false): string {
  if (
    typeof value !== "string" ||
    value.length > limit ||
    (!allowMultiline && /[\r\n]/.test(value))
  ) {
    return invalidDraft();
  }
  return value;
}

function validTargetDate(value: string): boolean {
  if (value === "") return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  if (year < 1 || month < 1 || month > 12 || day < 1) return false;
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day <= daysInMonth[month - 1];
}

function validateRelease(value: unknown): ReleaseIdentity {
  const release = exactRecord(value, RELEASE_FIELD_NAMES);
  for (const [field, limit] of Object.entries(RELEASE_TEXT_LIMITS)) {
    textField(release[field], limit, field === "notes");
  }
  if (!["Single", "EP", "Album"].includes(release.releaseType as string)) {
    return invalidDraft();
  }
  if (!validTargetDate(release.targetDate as string)) return invalidDraft();

  return {
    releaseTitle: release.releaseTitle as string,
    primaryArtist: release.primaryArtist as string,
    contactEmail: release.contactEmail as string,
    releaseType: release.releaseType as ReleaseType,
    labelName: release.labelName as string,
    genre: release.genre as string,
    language: release.language as string,
    targetDate: release.targetDate as string,
    upc: release.upc as string,
    artistLink: release.artistLink as string,
    notes: release.notes as string,
  };
}

function validateTrack(value: unknown): TrackMetadata {
  const track = exactRecord(value, [...Object.keys(TRACK_TEXT_LIMITS), "explicit"]);
  for (const [field, limit] of Object.entries(TRACK_TEXT_LIMITS)) {
    textField(track[field], limit);
  }
  if (!["No", "Yes", "Clean version"].includes(track.explicit as string)) {
    return invalidDraft();
  }

  return {
    title: track.title as string,
    version: track.version as string,
    artists: track.artists as string,
    songwriters: track.songwriters as string,
    explicit: track.explicit as TrackMetadata["explicit"],
    isrc: track.isrc as string,
  };
}

function validateDraft(value: unknown): ReleaseDraft {
  const draft = exactRecord(value, ["kind", "version", "release", "tracks"]);
  if (draft.kind !== "navasound-release-draft" || draft.version !== 1) return invalidDraft();
  if (
    !Array.isArray(draft.tracks) ||
    draft.tracks.length < 1 ||
    draft.tracks.length > MAX_RELEASE_DRAFT_TRACKS
  ) {
    return invalidDraft();
  }

  return {
    kind: "navasound-release-draft",
    version: 1,
    release: validateRelease(draft.release),
    tracks: Array.from(draft.tracks, validateTrack),
  };
}

function validateFileSize(input: string): void {
  if (
    input.length > MAX_RELEASE_DRAFT_BYTES ||
    new TextEncoder().encode(input).byteLength > MAX_RELEASE_DRAFT_BYTES
  ) {
    invalidDraft();
  }
}

export function parseReleaseDraft(input: string): ReleaseDraft {
  if (typeof input !== "string") return invalidDraft();
  validateFileSize(input);
  let value: unknown;
  try {
    value = JSON.parse(input);
  } catch {
    return invalidDraft();
  }
  return validateDraft(value);
}

export function createReleaseDraft(
  release: ReleaseIdentity,
  tracks: readonly TrackMetadata[],
): ReleaseDraft {
  // Pick editable metadata explicitly so track IDs, declarations and acceptance
  // flags cannot become part of a saved draft through object spreading.
  return validateDraft({
    kind: "navasound-release-draft",
    version: 1,
    release: {
      releaseTitle: release.releaseTitle,
      primaryArtist: release.primaryArtist,
      contactEmail: release.contactEmail,
      releaseType: release.releaseType,
      labelName: release.labelName,
      genre: release.genre,
      language: release.language,
      targetDate: release.targetDate,
      upc: release.upc,
      artistLink: release.artistLink,
      notes: release.notes,
    },
    tracks: tracks.map((track) => ({
      title: track.title,
      version: track.version,
      artists: track.artists,
      songwriters: track.songwriters,
      explicit: track.explicit,
      isrc: track.isrc,
    })),
  });
}

export function serializeReleaseDraft(draft: ReleaseDraft): string {
  const text = `${JSON.stringify(validateDraft(draft), null, 2)}\n`;
  validateFileSize(text);
  return text;
}

export function releaseDraftFilename(title: string): string {
  const slug = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 80)
    .replace(/(^-|-$)/g, "") || "release";
  return `navasound-${slug}-draft.json`;
}
