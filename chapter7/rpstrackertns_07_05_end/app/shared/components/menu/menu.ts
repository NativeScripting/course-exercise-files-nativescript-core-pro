import { goToSettingsPage } from '~/shared/helpers/navigation/nav.helper';
import { EventData } from 'tns-core-modules/ui/page';
import { PresetType } from '~/core/models/types';
import { getBacklogService } from '~/globals/dependencies/locator';

let container = null;

interface ObsWithPreset {
  preset: PresetType;
}

interface PresetEventData {
  object: ObsWithPreset;
}

export function onLoaded(args: EventData) {
  container = args.object;
}

export function onSelectPresetTap(args: PresetEventData) {
  const backlogService = getBacklogService();
  const selPreset = args.object.preset;
  backlogService.setPreset(selPreset).then(() => {
    container.presetSelected.apply(container.page.bindingContext, [selPreset]);
  });
}

export function onSettingsTap() {
  goToSettingsPage();
}
