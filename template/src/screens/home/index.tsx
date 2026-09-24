import {useScrollToTop} from '@react-navigation/native';
import {
  KeyboardAwareScrollView,
  MaterialDesignIcons,
  MaterialIcons,
  TurboImage,
} from 'components/uniwind';
import {Accordion} from 'heroui-native/accordion';
import {Alert} from 'heroui-native/alert';
import {BottomSheet} from 'heroui-native/bottom-sheet';
import {Button} from 'heroui-native/button';
import {Card} from 'heroui-native/card';
import {Checkbox} from 'heroui-native/checkbox';
import {Chip} from 'heroui-native/chip';
import {CloseButton} from 'heroui-native/close-button';
import {ControlField} from 'heroui-native/control-field';
import {Description} from 'heroui-native/description';
import {Dialog} from 'heroui-native/dialog';
import {useThemeColor} from 'heroui-native/hooks';
import {InputOTP, type InputOTPRef} from 'heroui-native/input-otp';
import {Label} from 'heroui-native/label';
import {Popover} from 'heroui-native/popover';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Radio} from 'heroui-native/radio';
import {RadioGroup} from 'heroui-native/radio-group';
import {SearchField} from 'heroui-native/search-field';
import {Select} from 'heroui-native/select';
import {Separator} from 'heroui-native/separator';
import {Slider} from 'heroui-native/slider';
import {Surface} from 'heroui-native/surface';
import {Typography} from 'heroui-native/text';
import {Toast, useToast} from 'heroui-native/toast';
import {Fragment, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {getBundleId} from 'react-native-device-info';
import type {KeyboardAwareScrollViewRef} from 'react-native-keyboard-controller';

interface CheckboxFieldProps {
  isSelected: boolean;
  onSelectedChange: (value: boolean) => void;
  title: string;
  description: string;
}

type SelectOption = {
  value: string;
  label: string;
};

const US_STATES: SelectOption[] = [
  {value: 'CA', label: 'California'},
  {value: 'NY', label: 'New York'},
  {value: 'TX', label: 'Texas'},
  {value: 'FL', label: 'Florida'},
];

const accordionData = [
  {
    id: '1',
    title: 'How do I place an order?',
    icon: (
      <MaterialIcons
        colorClassName="accent-muted"
        name="shopping-bag"
        size={16}
      />
    ),
    content:
      'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl.',
  },
  {
    id: '2',
    title: 'What payment methods do you accept?',
    icon: (
      <MaterialIcons
        colorClassName="accent-muted"
        name="card-membership"
        size={16}
      />
    ),
    content:
      'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl.',
  },
  {
    id: '3',
    title: 'How much does shipping cost?',
    icon: (
      <MaterialIcons colorClassName="accent-muted" name="money" size={16} />
    ),
    content:
      'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl.',
  },
];

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  isSelected,
  onSelectedChange,
  title,
  description,
}) => {
  return (
    <ControlField isSelected={isSelected} onSelectedChange={onSelectedChange}>
      <ControlField.Indicator>
        <Checkbox className="mt-0.5" />
      </ControlField.Indicator>
      <View className="flex-1">
        <Label className="text-lg">{title}</Label>
        <Description className="text-base">{description}</Description>
      </View>
    </ControlField>
  );
};

const HomeScreen = () => {
  const scrollRef = useRef<KeyboardAwareScrollViewRef>(null);
  useScrollToTop(scrollRef);
  const {t} = useTranslation();
  const themeColorDanger = useThemeColor('danger');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [fields, setFields] = useState({
    newsletter: true,
    marketing: false,
    terms: false,
  });
  const [selection, setSelection] = useState('desc1');
  const [price, setPrice] = useState<number | number[]>([200, 800]);
  const [searchValue, setSearchValue] = useState('');
  const [value, setValue] = useState<SelectOption | undefined>();
  const {toast} = useToast();
  const ref = useRef<InputOTPRef>(null);

  const onComplete = (code: string) => {
    // eslint-disable-next-line no-alert
    alert('OTP completed: ' + code);
    setTimeout(() => {
      ref.current?.clear();
    }, 1000);
  };

  const fieldConfigs: Record<
    keyof typeof fields,
    {title: string; description: string}
  > = {
    newsletter: {
      title: 'Subscribe to newsletter',
      description: 'Get weekly updates about new features and tips',
    },
    marketing: {
      title: 'Marketing communications',
      description: 'Receive promotional emails and special offers',
    },
    terms: {
      title: 'Accept terms and conditions',
      description: 'Agree to our Terms of Service and Privacy Policy',
    },
  };

  const handleFieldChange = (key: keyof typeof fields) => (v: boolean) => {
    setFields(prev => ({...prev, [key]: v}));
  };

  const fieldKeys = Object.keys(fields) as Array<keyof typeof fields>;

  return (
    <KeyboardAwareScrollView
      ref={scrollRef}
      bottomOffset={30}
      contentContainerClassName="gap-y-3 p-3">
      <Typography.Code className="m-3 self-center">
        {getBundleId()}
      </Typography.Code>
      <Typography.Heading type="h3">Accordion</Typography.Heading>
      <Accordion defaultValue="2" selectionMode="single" variant="surface">
        {accordionData.map(item => (
          <Accordion.Item key={item.id} value={item.id}>
            <Accordion.Trigger>
              <View className="flex-1 flex-row items-center gap-3">
                {item.icon}
                <Typography className="flex-1 text-base text-foreground">
                  {item.title}
                </Typography>
              </View>
              <Accordion.Indicator />
            </Accordion.Trigger>
            <Accordion.Content>
              <Typography className="px-6.25 text-base/relaxed text-muted">
                {item.content}
              </Typography>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
      <Typography.Heading type="h3">Alert</Typography.Heading>
      <View className="w-full gap-4">
        <Alert status="accent">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Update available</Alert.Title>
            <Alert.Description>
              A new version of the application is available. Please refresh to
              get the latest features and bug fixes.
            </Alert.Description>
          </Alert.Content>
          <Button size="sm" variant="primary">
            Refresh
          </Button>
        </Alert>
        <Alert status="danger">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Unable to connect to server</Alert.Title>
            <Alert.Description>
              Unable to connect to the server. Check your internet connection
              and try again.
            </Alert.Description>
          </Alert.Content>
          <Button size="sm" variant="danger">
            Retry
          </Button>
        </Alert>
        <Alert className="items-cent" status="success">
          <Alert.Indicator className="pt-0" />
          <Alert.Content>
            <Alert.Title>Profile updated successfully</Alert.Title>
          </Alert.Content>
          <CloseButton />
        </Alert>
      </View>
      <Typography.Heading type="h3">BottomSheet</Typography.Heading>
      <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
        <BottomSheet.Trigger asChild>
          <Button variant="secondary">Open Bottom Sheet</Button>
        </BottomSheet.Trigger>
        <BottomSheet.Portal>
          <BottomSheet.Overlay />
          <BottomSheet.Content>
            <View className="mb-5 items-center">
              <View className="size-20 items-center justify-center rounded-full bg-green-500/10">
                <MaterialIcons
                  className="text-green-500"
                  name="shield"
                  size={40}
                />
              </View>
            </View>
            <View className="mb-8 items-center gap-2">
              <BottomSheet.Title className="text-center">
                Keep yourself safe
              </BottomSheet.Title>
              <BottomSheet.Description className="text-center">
                Update your software to the latest version for better security
                and performance.
              </BottomSheet.Description>
            </View>
            <View className="gap-3">
              <Button onPress={() => setIsOpen(false)}>Update Now</Button>
              <Button variant="tertiary" onPress={() => setIsOpen(false)}>
                Later
              </Button>
            </View>
          </BottomSheet.Content>
        </BottomSheet.Portal>
      </BottomSheet>
      <Typography.Heading type="h3">Button</Typography.Heading>
      <View className="gap-4 p-4">
        <Button variant="primary">
          <MaterialIcons
            colorClassName="accent-accent-foreground"
            name="add"
            size={20}
          />
          <Button.Label>Add Item</Button.Label>
        </Button>
        <View className="flex-row gap-4">
          <Button isIconOnly size="sm">
            <MaterialDesignIcons
              colorClassName="accent-foreground"
              name="heart"
              size={16}
            />
          </Button>
          <Button isIconOnly size="sm" variant="secondary">
            <MaterialIcons
              colorClassName="accent-accent-soft-foreground"
              name="bookmark"
              size={16}
            />
          </Button>
          <Button isIconOnly size="sm" variant="danger">
            <MaterialDesignIcons
              colorClassName="accent-danger-foreground"
              name="trash-can"
              size={16}
            />
          </Button>
        </View>
        <Button variant="tertiary">
          <Button.Label>Learn More</Button.Label>
          <MaterialDesignIcons
            colorClassName="accent-default-foreground"
            name="chevron-triple-right"
            size={18}
          />
        </Button>
      </View>
      <Typography.Heading type="h3">Card</Typography.Heading>
      <Card>
        <View className="gap-4">
          <Card.Body className="mb-4">
            <View className="mb-2 gap-1">
              <Card.Title className="text-pink-500">$450</Card.Title>
              <Card.Title>Living room Sofa • Collection 2025</Card.Title>
            </View>
            <Card.Description>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces.
            </Card.Description>
          </Card.Body>
          <Card.Footer className="gap-3">
            <Button variant="primary">Buy now</Button>
            <Button variant="ghost">
              <Button.Label>Add to cart</Button.Label>
              <MaterialDesignIcons name="bag-personal" size={16} />
            </Button>
          </Card.Footer>
        </View>
      </Card>
      <Typography.Heading type="h3">
        Checkbox, ControlField, Description, Label, Separator
      </Typography.Heading>
      <View className="flex-1 items-center justify-center px-5">
        <Surface className="w-full py-5">
          {fieldKeys.map((key, index) => (
            <Fragment key={key}>
              {index > 0 && <Separator className="my-4" />}
              <CheckboxField
                description={fieldConfigs[key].description}
                isSelected={fields[key]}
                title={fieldConfigs[key].title}
                onSelectedChange={handleFieldChange(key)}
              />
            </Fragment>
          ))}
        </Surface>
      </View>
      <Typography.Heading type="h3">Chip</Typography.Heading>
      <View className="gap-4 p-4">
        <View className="flex-row flex-wrap gap-2">
          <Chip size="sm">Small</Chip>
          <Chip size="md">Medium</Chip>
          <Chip size="lg">Large</Chip>
        </View>
        <View className="flex-row flex-wrap gap-2">
          <Chip color="accent" variant="primary">
            Primary
          </Chip>
          <Chip color="success" variant="secondary">
            <View className="size-1.5 rounded-full bg-success" />
            <Chip.Label>Success</Chip.Label>
          </Chip>
          <Chip color="warning" variant="tertiary">
            <MaterialDesignIcons color="#F59E0B" name="star" size={12} />
            <Chip.Label>Premium</Chip.Label>
          </Chip>
        </View>
        <View className="flex-row gap-2">
          <Chip variant="secondary">
            <Chip.Label>Remove</Chip.Label>
            <MaterialDesignIcons color="#6B7280" name="close" size={14} />
          </Chip>
          <Chip className="bg-purple-600">
            <Chip.Label className="font-semibold text-white">Custom</Chip.Label>
          </Chip>
        </View>
      </View>
      <Typography.Heading type="h3">CloseButton</Typography.Heading>
      <View className="flex-1 items-center justify-center px-5">
        <View className="flex-row items-center gap-4">
          <CloseButton />
          <CloseButton iconProps={{color: themeColorDanger}} />
          <CloseButton>
            <MaterialDesignIcons
              colorClassName="accent-foreground"
              name="close-circle"
              size={28}
            />
          </CloseButton>
          <CloseButton isDisabled />
        </View>
      </View>
      <Typography.Heading type="h3">Dialog</Typography.Heading>
      <Dialog isOpen={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <Dialog.Trigger asChild>
          <Button variant="primary">Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Close variant="ghost" />
            <View className="mb-5 gap-1.5">
              <Dialog.Title>Confirm Action</Dialog.Title>
              <Dialog.Description>
                Are you sure you want to proceed with this action? This cannot
                be undone.
              </Dialog.Description>
            </View>
            <View className="flex-row justify-end gap-3">
              <Button
                size="sm"
                variant="ghost"
                onPress={() => setIsOpenDialog(false)}>
                Cancel
              </Button>
              <Button size="sm">Confirm</Button>
            </View>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
      <Typography.Heading type="h3">
        FieldError, Input (xem tab Form)
      </Typography.Heading>
      <Typography.Heading type="h3">InputOTP</Typography.Heading>
      <View className="flex-1 items-center justify-center px-5">
        <View>
          <Label>Verify account</Label>
          <Description className="mb-3">
            We've sent a code to a****@gmail.com
          </Description>
          <InputOTP ref={ref} maxLength={6} onComplete={onComplete}>
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
            </InputOTP.Group>
            <InputOTP.Separator />
            <InputOTP.Group>
              <InputOTP.Slot index={3} />
              <InputOTP.Slot index={4} />
              <InputOTP.Slot index={5} />
            </InputOTP.Group>
          </InputOTP>
        </View>
      </View>
      <Typography.Heading type="h3">
        ListGroup (xem tab {t('tabs.tab3')})
      </Typography.Heading>
      <Typography.Heading type="h3">Popover</Typography.Heading>
      <Popover>
        <Popover.Trigger asChild>
          <Button size="sm" variant="tertiary">
            <MaterialDesignIcons
              colorClassName="accent-muted"
              name="information-variant-circle"
              size={20}
            />
            <Button.Label>Show Info</Button.Label>
          </Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Overlay />
          <Popover.Content
            className="gap-1 rounded-xl px-6 py-4"
            presentation="popover"
            width={320}>
            <Popover.Close className="absolute top-3 right-3 z-50" />
            <Popover.Title>Information</Popover.Title>
            <Popover.Description>
              This popover includes a title and description to provide more
              structured information to users.
            </Popover.Description>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
      <Typography.Heading type="h3">PressableFeedback</Typography.Heading>
      <PressableFeedback className="aspect-square max-h-80 w-full overflow-auto">
        <Card className="flex-1">
          <TurboImage
            className="absolute top-0 right-0 bottom-0 left-0"
            resizeMode="cover"
            source={{
              uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/neo2.jpeg',
            }}
          />
          <View className="bg-black/40" style={StyleSheet.absoluteFill} />
          <PressableFeedback.Ripple
            animation={{
              backgroundColor: {value: 'white'},
              opacity: {value: [0, 0.3, 0]},
            }}
          />
          <View className="flex-1 gap-4" pointerEvents="box-none">
            <Card.Body className="flex-1" pointerEvents="none">
              <Card.Title className="mb-0.5 text-base text-zinc-50 uppercase">
                Neo
              </Card.Title>
              <Card.Description className="text-base font-medium text-zinc-50">
                Home robot
              </Card.Description>
            </Card.Body>
            <Card.Footer className="gap-3">
              <View className="flex-row items-center justify-between">
                <View pointerEvents="none">
                  <Typography className="text-base text-white">
                    Available soon
                  </Typography>
                  <Typography className="text-base text-zinc-300">
                    Get notified
                  </Typography>
                </View>
                <Button className="bg-white" size="sm">
                  <Button.Label className="text-black">Notify me</Button.Label>
                </Button>
              </View>
            </Card.Footer>
          </View>
        </Card>
      </PressableFeedback>
      <Typography.Heading type="h3">RadioGroup</Typography.Heading>
      <Surface className="w-full">
        <RadioGroup value={selection} onValueChange={setSelection}>
          <RadioGroup.Item value="desc1">
            <View>
              <Label>Standard Shipping</Label>
              <Description>Delivered in 5-7 business days</Description>
            </View>
            <Radio />
          </RadioGroup.Item>
          <Separator className="my-1" />
          <RadioGroup.Item value="desc2">
            <View>
              <Label>Express Shipping</Label>
              <Description>Delivered in 2-3 business days</Description>
            </View>
            <Radio />
          </RadioGroup.Item>
          <Separator className="my-1" />
          <RadioGroup.Item value="desc3">
            <View>
              <Label>Overnight Shipping</Label>
              <Description>Delivered next business day</Description>
            </View>
            <Radio />
          </RadioGroup.Item>
        </RadioGroup>
      </Surface>
      <Typography.Heading type="h3">SearchField</Typography.Heading>
      <View className="px-5">
        <SearchField value={searchValue} onChange={setSearchValue}>
          <Label>Find products</Label>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input />
            <SearchField.ClearButton />
          </SearchField.Group>
          <Description>Search by name, category, or SKU</Description>
        </SearchField>
      </View>
      <Typography.Heading type="h3">Select</Typography.Heading>
      <Select value={value} onValueChange={setValue}>
        <Select.Trigger>
          <Select.Value placeholder="Select one" />
          <Select.TriggerIndicator />
        </Select.Trigger>
        <Select.Portal>
          <Select.Overlay />
          <Select.Content presentation="popover" width="trigger">
            <Select.ListLabel className="mb-2">Choose a state</Select.ListLabel>
            {US_STATES.map((state, index) => (
              <Fragment key={state.value}>
                <Select.Item label={state.label} value={state.value} />
                {index < US_STATES.length - 1 && <Separator />}
              </Fragment>
            ))}
          </Select.Content>
        </Select.Portal>
      </Select>
      <Typography.Heading type="h3">Slider</Typography.Heading>
      <View className="gap-8 px-8">
        <Slider defaultValue={30}>
          <View className="flex-row items-center justify-between">
            <Label>Volume</Label>
            <Slider.Output />
          </View>
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>
        <Slider
          formatOptions={{style: 'currency', currency: 'USD'}}
          maxValue={1000}
          minValue={0}
          step={10}
          value={price}
          onChange={setPrice}>
          <View className="flex-row items-center justify-between">
            <Label>Price range</Label>
            <Slider.Output />
          </View>
          <Slider.Track>
            {({state}) => (
              <>
                <Slider.Fill />
                {state.values.map((_, i) => (
                  <Slider.Thumb key={i} index={i} />
                ))}
              </>
            )}
          </Slider.Track>
        </Slider>
      </View>
      <Typography.Heading type="h3">Toast</Typography.Heading>
      <View className="gap-4 p-4">
        <Button
          onPress={() =>
            toast.show({
              variant: 'success',
              label: 'You have upgraded your plan',
              description: 'You can continue using HeroUI Chat',
              actionLabel: 'Close',
              onActionPress: ({hide}) => hide(),
            })
          }>
          Show Success Toast
        </Button>
        <Button
          onPress={() =>
            toast.show({
              component: props => (
                <Toast variant="accent" {...props}>
                  <Toast.Title>Custom Toast</Toast.Title>
                  <Toast.Description>
                    This uses a custom component
                  </Toast.Description>
                  <Toast.Action onPress={() => props.hide()}>Undo</Toast.Action>
                  <Toast.Close className="absolute top-0 right-0" />
                </Toast>
              ),
            })
          }>
          Show Custom Toast
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default HomeScreen;
