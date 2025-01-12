import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { AdminDetailComponent } from './components/admin-detail/admin-detail.component';
import { AdministratorListComponent } from './components/administrator-list/administrator-list.component';
import { ChannelDetailComponent } from './components/channel-detail/channel-detail.component';
import { ChannelListComponent } from './components/channel-list/channel-list.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { GlobalSettingsComponent } from './components/global-settings/global-settings.component';
import { PaymentMethodDetailComponent } from './components/payment-method-detail/payment-method-detail.component';
import { PaymentMethodListComponent } from './components/payment-method-list/payment-method-list.component';
import { PermissionGridComponent } from './components/permission-grid/permission-grid.component';
import { RoleDetailComponent } from './components/role-detail/role-detail.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { ShippingMethodDetailComponent } from './components/shipping-method-detail/shipping-method-detail.component';
import { ShippingMethodListComponent } from './components/shipping-method-list/shipping-method-list.component';
import { ShippingMethodTestResultComponent } from './components/shipping-method-test-result/shipping-method-test-result.component';
import { TaxCategoryDetailComponent } from './components/tax-category-detail/tax-category-detail.component';
import { TaxCategoryListComponent } from './components/tax-category-list/tax-category-list.component';
import { TaxRateDetailComponent } from './components/tax-rate-detail/tax-rate-detail.component';
import { TaxRateListComponent } from './components/tax-rate-list/tax-rate-list.component';
import { TestAddressFormComponent } from './components/test-address-form/test-address-form.component';
import { TestOrderBuilderComponent } from './components/test-order-builder/test-order-builder.component';
import { ZoneSelectorDialogComponent } from './components/zone-selector-dialog/zone-selector-dialog.component';
import { AdministratorResolver } from './providers/routing/administrator-resolver';
import { ChannelResolver } from './providers/routing/channel-resolver';
import { CountryResolver } from './providers/routing/country-resolver';
import { GlobalSettingsResolver } from './providers/routing/global-settings-resolver';
import { PaymentMethodResolver } from './providers/routing/payment-method-resolver';
import { RoleResolver } from './providers/routing/role-resolver';
import { ShippingMethodResolver } from './providers/routing/shipping-method-resolver';
import { TaxCategoryResolver } from './providers/routing/tax-category-resolver';
import { TaxRateResolver } from './providers/routing/tax-rate-resolver';
import { settingsRoutes } from './settings.routes';

@NgModule({
    imports: [SharedModule, RouterModule.forChild(settingsRoutes)],
    declarations: [
        TaxCategoryListComponent,
        TaxCategoryDetailComponent,
        AdministratorListComponent,
        RoleListComponent,
        RoleDetailComponent,
        AdminDetailComponent,
        PermissionGridComponent,
        CountryListComponent,
        CountryDetailComponent,
        ZoneSelectorDialogComponent,
        TaxRateListComponent,
        TaxRateDetailComponent,
        ChannelListComponent,
        ChannelDetailComponent,
        ShippingMethodListComponent,
        ShippingMethodDetailComponent,
        PaymentMethodListComponent,
        PaymentMethodDetailComponent,
        GlobalSettingsComponent,
        TestOrderBuilderComponent,
        TestAddressFormComponent,
        ShippingMethodTestResultComponent,
    ],
    entryComponents: [ZoneSelectorDialogComponent],
    providers: [
        TaxCategoryResolver,
        AdministratorResolver,
        RoleResolver,
        CountryResolver,
        TaxRateResolver,
        ChannelResolver,
        ShippingMethodResolver,
        PaymentMethodResolver,
        GlobalSettingsResolver,
    ],
})
export class SettingsModule {}
